// utils/calendar.js
import * as Calendar from 'expo-calendar';
import { Platform, Alert } from 'react-native';

export async function initCalendar() {
  const calPerm = await Calendar.requestCalendarPermissionsAsync();
  if (calPerm.status !== 'granted') {
    Alert.alert('Permisos', 'Se requieren permisos de calendario para crear eventos.');
    return null;
  }
  return await ensureCalendarAsync();
}

export async function ensureCalendarAsync() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const existing = calendars.find((c) => c.name === 'Riego de Plantas');
  if (existing) return existing.id;

  const all = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const source =
    Platform.OS === 'ios'
      ? (await Calendar.getDefaultCalendarAsync()).source
      : (all.find((c) => c.source && c.source.isLocal) || all[0]).source;

  const newCalId = await Calendar.createCalendarAsync({
    title: 'Riego de Plantas',
    color: '#4CAF50',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: Platform.OS === 'ios' ? source.id : undefined,
    source: Platform.OS === 'android' ? source : undefined,
    name: 'Riego de Plantas',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  return newCalId;
}

export async function createCalendarEvent(calendarId, { title, notes, startDate }) {
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);
  const eventId = await Calendar.createEventAsync(calendarId, {
    title,
    notes,
    startDate,
    endDate,
    timeZone: undefined,
  });
  return eventId;
}

export async function deleteCalendarEvent(eventId) {
  try {
    if (eventId) await Calendar.deleteEventAsync(eventId);
  } catch {}
}
