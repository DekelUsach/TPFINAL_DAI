// hooks/usePlantEvents.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { loadEvents, saveEvents } from '../utils/storage';
import { initNotifications, scheduleNotification, cancelNotification } from '../utils/notifications';
import { initCalendar, ensureCalendarAsync, createCalendarEvent, deleteCalendarEvent } from '../utils/calendar';

export function usePlantEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const calendarIdRef = useRef(null);

  // Initialize and load
  useEffect(() => {
    (async () => {
      try {
        await initNotifications();
        const calId = await initCalendar();
        calendarIdRef.current = calId;
        const list = await loadEvents();
        setEvents(list);
      } catch (e) {
        console.warn('Init error', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next) => {
    setEvents(next);
    await saveEvents(next);
  }, []);

  const addEvent = useCallback(async ({ title, plant, description, date }) => {
    if (!title?.trim() || !plant?.trim()) {
      Alert.alert('Campos requeridos', 'Título y planta son obligatorios.');
      return null;
    }
    if (date.getTime() < Date.now() + 5000) {
      Alert.alert('Fecha inválida', 'Elige una fecha futura para el recordatorio.');
      return null;
    }
    const niceBody = `${title.trim()} • ${plant.trim()}${description?.trim() ? ' — ' + description.trim() : ''}`;
    const calId = calendarIdRef.current || (await ensureCalendarAsync());
    const [notificationId, calendarEventId] = await Promise.all([
      scheduleNotification(date, niceBody),
      createCalendarEvent(calId, { title: `${title.trim()} (${plant.trim()})`, notes: description?.trim() || '', startDate: date }),
    ]);
    const newItem = {
      id: String(Date.now()),
      title: title.trim(),
      plant: plant.trim(),
      description: description?.trim() || '',
      dateISO: date.toISOString(),
      notificationId,
      calendarEventId,
    };
    const next = [newItem, ...events].sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
    await persist(next);
    return newItem;
  }, [events, persist]);

  const removeEvent = useCallback(async (item) => {
    try {
      if (item?.notificationId) await cancelNotification(item.notificationId);
      if (item?.calendarEventId) await deleteCalendarEvent(item.calendarEventId);
      const next = events.filter((e) => e.id !== item.id);
      await persist(next);
      Alert.alert('Eliminado', 'Evento eliminado.');
    } catch (e) {
      console.warn('Delete failed', e);
      Alert.alert('Error', 'No se pudo eliminar el evento.');
    }
  }, [events, persist]);

  return { events, loading, addEvent, removeEvent };
}
