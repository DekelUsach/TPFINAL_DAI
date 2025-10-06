# 🌿 Botanical Studio - Documentación Completa del Código

## 📋 Descripción General

**Botanical Studio** es una aplicación móvil desarrollada con React Native que ayuda a los usuarios a gestionar recordatorios para el cuidado de plantas. La aplicación permite crear eventos personalizados para regar, fertilizar y realizar otros cuidados botánicos, con integración completa de notificaciones push y calendario.

## 🏗️ Arquitectura de la Aplicación

La aplicación sigue una arquitectura modular organizada en los siguientes directorios:

- **`components/`** - Componentes reutilizables de la interfaz de usuario
- **`hooks/`** - Lógica de estado y efectos personalizados
- **`utils/`** - Utilidades, configuración de estilos y funciones auxiliares
- **`assets/`** - Recursos estáticos (imágenes, fuentes, etc.)

## 📁 **index.js** - Punto de Entrada

Este es el archivo de entrada principal que registra la aplicación en Expo/React Native.

```javascript
// index.js - Línea 1-9
import { registerRootComponent } from 'expo';

// Línea 1: Esta línea importa una función llamada "registerRootComponent" desde la biblioteca "expo"
// - "expo" es una plataforma que facilita crear aplicaciones móviles
// - "registerRootComponent" es como un "registrador oficial" que le dice al sistema operativo móvil:
//   "¡Hola! Esta aplicación empieza aquí"

import App from './App';

// Línea 3: Esta línea importa el archivo "App.js" que está en la misma carpeta
// - "./App" significa "busca el archivo App en la carpeta actual"
// - Ahora tenemos acceso a toda la lógica de nuestra aplicación

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

// Líneas 5-7: Estos son comentarios (texto que el programa ignora)
// - Explican qué hace la función registerRootComponent
// - AppRegistry.registerComponent es como registrar la aplicación con el nombre 'main'
// - Se asegura de que la aplicación funcione tanto en "Expo Go" (modo desarrollo)
//   como en una aplicación real instalada en el teléfono

registerRootComponent(App);

// Línea 8: Esta es la línea más importante del archivo
// - Llama a registerRootComponent y le pasa nuestra aplicación (App)
// - Es como decir: "¡Sistema operativo! Esta es mi aplicación principal, ¡házla funcionar!"
```

## 📁 **utils/storage.js** - Gestión de Almacenamiento Local

Este archivo maneja la persistencia de datos usando AsyncStorage de React Native.

```javascript
// utils/storage.js - Línea 1-23
import AsyncStorage from '@react-native-async-storage/async-storage';

// Línea 1: Esta línea importa AsyncStorage desde React Native
// - AsyncStorage es como un "armario mágico" donde podemos guardar información
// - Los datos se guardan como texto y persisten aunque cierres la aplicación
// - Es perfecto para guardar cosas como configuraciones o listas de elementos

export const STORAGE_KEY = '@plant_events_v1';

// Línea 4: Esta línea crea una constante llamada STORAGE_KEY
// - "export" significa que otros archivos pueden usar esta constante
// - "const" significa que este valor nunca cambiará
// - El valor '@plant_events_v1' es como una "etiqueta única" para identificar nuestros datos
// - El símbolo @ es una convención para evitar conflictos con otros datos

export async function loadEvents() {
  // Línea 6: Esta línea define una función llamada loadEvents (cargar eventos)
  // - "async" significa que esta función puede "esperar" a que termine alguna operación
  // - Es como decir "voy a cargar los eventos, pero puede tomar tiempo"

  try {
    // Línea 7: "try" inicia un bloque de código que puede fallar
    // - Si algo sale mal, el programa no se rompe, solo muestra un mensaje de error

    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    // Línea 8: Esta línea obtiene los datos guardados usando nuestra clave única
    // - await significa "espera hasta que termine esta operación"
    // - getItem busca en el almacenamiento usando nuestra etiqueta '@plant_events_v1'
    // - Si encuentra datos, los devuelve como texto

    return raw ? JSON.parse(raw) : [];
    // Línea 9: Esta línea devuelve los datos procesados
    // - raw ? significa "si raw existe y no está vacío"
    // - JSON.parse(raw) convierte el texto guardado en objetos JavaScript útiles
    // - : [] significa "si no hay datos, devuelve una lista vacía"
  } catch (e) {
    // Línea 10: Si algo sale mal en el bloque try, se ejecuta esto
    // - "e" es el error que ocurrió
    console.warn('Error loading events', e);
    // Línea 11: Muestra una advertencia en la consola del desarrollador
    // - console.warn es como imprimir un mensaje de "cuidado" en la consola
    return [];
    // Línea 12: Siempre devuelve una lista vacía si hay error
  }
}

export async function saveEvents(events) {
  // Línea 16: Esta función guarda los eventos en el almacenamiento
  // - "events" es la lista de recordatorios que queremos guardar

  try {
    // Línea 17: Otro bloque try para manejar posibles errores
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    // Línea 18: Guarda los eventos en el almacenamiento
    // - JSON.stringify convierte los objetos JavaScript en texto
    // - setItem guarda el texto usando nuestra clave única
  } catch (e) {
    // Línea 19: Si hay error al guardar
    console.warn('Error saving events', e);
    // Línea 20: Muestra una advertencia en la consola
  }
}
```

## 📁 **utils/colors.js** - Sistema de Diseño Visual

Este archivo define el sistema de colores, tipografía, espaciado y efectos visuales de la aplicación.

```javascript
// utils/colors.js - Tema de colores para la aplicación de plantas con estética premium
// Línea 1: Este es un comentario que explica qué hace el archivo

export const colors = {
  // Línea 2: Crea un objeto llamado colors que contiene todos los colores

  // Paleta principal inspirada en jardines botánicos
  primary: {
    ultraLight: '#EAF7EE',   // Musgo en rocío
    light: '#B8E6C6',        // Salvia
    main: '#3C8D5D',         // Hoja húmeda
    dark: '#1E5C34',         // Bosque profundo
    ultraDark: '#103921',    // Pino sombrío
  },
  // Líneas 3-10: Define colores verdes inspirados en plantas y naturaleza
  // - Cada color tiene un nombre descriptivo y un código hexadecimal
  // - #EAF7EE es un verde muy claro (como musgo mojado)
  // - #3C8D5D es un verde medio (como hoja húmeda)
  // - Los nombres como "ultraLight", "main", "dark" ayudan a usar el color correcto

  // Paleta secundaria para contrastes sofisticados
  secondary: {
    blush: '#F6D1C1',
    terracotta: '#C8825B',
    sand: '#D8C3A5',
    mist: '#9FB3C8',
  },
  // Líneas 12-18: Colores secundarios para variedad visual
  // - blush: rosado suave
  // - terracotta: color tierra
  // - sand: arena
  // - mist: niebla azulada

  // Acentos vibrantes pero refinados
  accent: {
    lime: '#D2FF72',
    amber: '#FFC857',
    orchid: '#C77DFF',
    coral: '#FF7F6A',
  },
  // Líneas 20-26: Colores brillantes para llamar la atención
  // - lime: verde lima brillante
  // - amber: ámbar/dorado
  // - orchid: orquídea morada
  // - coral: coral anaranjado

  // Capas y superficies
  surface: {
    base: '#F5F8F4',
    raised: '#FFFFFF',
    muted: '#EEF3ED',
    outline: '#D8E2DA',
    translucent: 'rgba(255, 255, 255, 0.6)',
  },
  // Líneas 28-35: Colores para fondos y superficies
  // - base: color de fondo principal
  // - raised: blanco puro para tarjetas elevadas
  // - translucent: blanco semi-transparente

  // Tipografía
  text: {
    dominant: '#0F2D1F',
    primary: '#224A33',
    secondary: '#4F6B59',
    muted: '#7D8D83',
    inverse: '#F4FFF7',
  },
  // Líneas 37-44: Colores para texto
  // - dominant: negro verdoso muy oscuro
  // - primary: verde oscuro para texto principal
  // - secondary: verde grisáceo para texto secundario
  // - inverse: blanco verdoso para texto sobre fondos oscuros

  // Estados semánticos
  states: {
    success: '#3C8D5D',
    successSoft: 'rgba(60, 141, 93, 0.16)',
    warning: '#E2B93B',
    warningSoft: 'rgba(226, 185, 59, 0.18)',
    danger: '#DE5B5B',
    dangerSoft: 'rgba(222, 91, 91, 0.18)',
    info: '#3E7CB1',
    infoSoft: 'rgba(62, 124, 177, 0.16)',
  },
  // Líneas 46-56: Colores para diferentes estados de la interfaz
  // - success: verde para cosas que salieron bien
  // - warning: amarillo para advertencias
  // - danger: rojo para errores o acciones peligrosas
  // - info: azul para información

  // Sombras y halos
  shadow: {
    soft: 'rgba(17, 59, 37, 0.08)',
    medium: 'rgba(17, 59, 37, 0.16)',
    strong: 'rgba(17, 59, 37, 0.24)',
  },
  // Líneas 58-63: Colores para sombras
  // - soft: sombra muy sutil
  // - medium: sombra media
  // - strong: sombra intensa

  // Destellos de luz para efectos neomórficos
  glow: {
    primary: 'rgba(210, 255, 114, 0.4)',
    accent: 'rgba(255, 200, 87, 0.35)',
  },
  // Líneas 65-70: Colores para efectos de brillo
  // - primary: brillo verde
  // - accent: brillo dorado
};

// Gradientes predefinidos con dinamismo orgánico
export const gradients = {
  canopy: ['#1E5C34', '#3C8D5D', '#B8E6C6'],
  sunrise: ['#FFC857', '#FF7F6A', '#C77DFF'],
  morningMist: ['#EEF3ED', '#9FB3C8'],
  lagoon: ['#0C3C30', '#264D79'],
  glassCard: ['rgba(255,255,255,0.86)', 'rgba(245,248,244,0.9)'],
};
// Líneas 72-79: Define combinaciones de colores para gradientes
// - canopy: gradiente verde bosque
// - sunrise: gradiente amanecer (dorado a morado)
// - Cada gradiente es una lista de colores que se mezclan suavemente

// Función utilitaria para gradientes (pensada para web / estilos inline)
export const createGradient = (palette, direction = '135deg') => {
  return `linear-gradient(${direction}, ${palette.join(', ')})`;
};
// Líneas 81-84: Función para crear gradientes CSS
// - palette: lista de colores
// - direction: ángulo del gradiente (135 grados por defecto)
// - join(', ') convierte la lista en texto separado por comas

// Tipografía
export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 26,
    display: 34,
  },
  // Líneas 87-96: Define tamaños de letra en píxeles
  // - xs: muy pequeño (12px)
  // - sm: pequeño (14px)
  // - md: mediano (16px) - tamaño estándar
  // - lg: grande (18px)
  // - xl: muy grande (20px)
  // - xxl: enorme (26px)
  // - display: gigantesco (34px) para títulos principales

  fontWeight: {
    hairline: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  // Líneas 97-104: Define pesos de letra (grosor)
  // - hairline: muy delgado (200)
  // - light: ligero (300)
  // - regular: normal (400)
  // - medium: medio (500)
  // - semibold: semi-grueso (600)
  // - bold: grueso (700)

  lineHeight: {
    compact: 1.25,
    standard: 1.4,
    spacious: 1.65,
  },
  // Líneas 105-110: Define alturas de línea (espacio entre líneas de texto)
  // - compact: apretado (1.25 veces el tamaño de letra)
  // - standard: normal (1.4 veces)
  // - spacious: espacioso (1.65 veces)
};

// Espaciado consistente
export const spacing = {
  xxs: 2,
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
// Líneas 112-121: Define medidas de espaciado en píxeles
// - xxs: mínimo (2px)
// - xs: pequeño (6px)
// - sm: mediano-pequeño (10px)
// - md: mediano (16px)
// - lg: grande (24px)
// - xl: muy grande (32px)
// - xxl: enorme (48px)

// Border radius
export const borderRadius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
  full: 9999,
};
// Líneas 123-132: Define curvaturas de bordes
// - xs: ligeramente redondeado (6px)
// - sm: poco redondeado (10px)
// - md: redondeado medio (14px)
// - lg: muy redondeado (20px)
// - xl: extremadamente redondeado (28px)
// - pill: forma de pastilla (999px - casi círculo)
// - full: completamente redondeado (9999px)

// Sombras
export const shadows = {
  sm: {
    shadowColor: colors.shadow.soft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  // Líneas 135-142: Define sombras pequeñas
  // - shadowColor: color de la sombra (verde sutil)
  // - shadowOffset: desplazamiento (0 horizontal, 2 vertical)
  // - shadowOpacity: qué tan visible (1 = completamente visible)
  // - shadowRadius: qué tan difusa (8px)
  // - elevation: elevación para Android (2)

  md: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 22,
    elevation: 6,
  },
  // Líneas 143-149: Sombras medianas (más intensas)

  lg: {
    shadowColor: colors.shadow.strong,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 1,
    shadowRadius: 36,
    elevation: 14,
  },
  // Líneas 150-156: Sombras grandes (muy intensas)
};

export const blur = {
  light: 12,
  medium: 18,
  strong: 26,
};
// Líneas 159-163: Define niveles de desenfoque para efectos visuales
// - light: desenfoque ligero (12px)
// - medium: desenfoque medio (18px)
// - strong: desenfoque fuerte (26px)
```

## 📁 **utils/notifications.js** - Sistema de Notificaciones

Este archivo gestiona las notificaciones push que alertan al usuario sobre los recordatorios de plantas.

```javascript
// utils/notifications.js - Línea 1-56
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

// Línea 1: Importa todas las funciones de notificaciones de Expo
// - expo-notifications es una biblioteca para manejar notificaciones push
// - * significa "importa todo" de esa biblioteca

// Línea 2: Importa Platform (para saber si es iOS o Android) y Alert (para mostrar mensajes)

export async function initNotifications() {
  // Línea 5: Función para inicializar el sistema de notificaciones
  // - async significa que puede tomar tiempo

  // Foreground handling
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
    }),
  });
  // Líneas 6-13: Configura cómo se comportan las notificaciones cuando la app está abierta
  // - shouldShowBanner: mostrar en la parte superior (true)
  // - shouldShowList: mostrar en lista de notificaciones (true)
  // - shouldPlaySound: hacer sonido (true)

  // Permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  // Líneas 15-21: Maneja permisos de notificaciones
  // - Primero verifica si ya tenemos permisos
  // - Si no los tenemos ("granted"), los pide al usuario
  // - finalStatus guarda el resultado final

  if (finalStatus !== 'granted') {
    Alert.alert('Permisos', 'Se requieren permisos de notificaciones para avisarte cuando regar.');
  }
  // Líneas 22-24: Si no tenemos permisos, muestra un mensaje explicativo
  // - Alert.alert crea una ventana emergente
  // - Explica por qué necesitamos permisos de notificaciones

  // Android channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('watering', {
      name: 'Recordatorios de riego',
      importance: Notifications.AndroidImportance.MAX,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#4CAF50',
    });
  }
  // Líneas 26-35: Configuración específica para Android
  // - Crea un "canal" de notificaciones llamado 'watering'
  // - importance: MAX (máxima prioridad)
  // - vibrationPattern: patrón de vibración (pausa, vibrar, pausa, vibrar)
  // - lightColor: color de luz LED verde
}

export async function scheduleNotification(date, body) {
  // Línea 38: Función para programar una notificación específica
  // - date: cuándo debe aparecer la notificación
  // - body: el texto de la notificación

  const trigger = date;
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio de riego 💧',
      body,
      sound: 'default',
    },
    trigger: Platform.OS === 'android' ? { channelId: 'watering', date: trigger } : trigger,
  });
  // Líneas 39-47: Programa la notificación
  // - title: "Recordatorio de riego 💧" (título fijo)
  // - body: texto personalizado que recibe la función
  // - trigger: cuándo debe aparecer
  // - En Android especifica el canal 'watering'
  // - Devuelve un ID único para identificar esta notificación

  return id;
}

export async function cancelNotification(id) {
  // Línea 51: Función para cancelar una notificación
  // - id: el identificador único de la notificación a cancelar

  try {
    if (id) await Notifications.cancelScheduledNotificationAsync(id);
  } catch {}
  // Líneas 52-55: Cancela la notificación si existe el ID
  // - try/catch por si hay error (no queremos que la app se rompa)
  // - El catch vacío significa "ignora cualquier error"
}
```

## 📁 **utils/calendar.js** - Integración con Calendario

Este archivo maneja la integración con el calendario nativo del dispositivo para crear eventos de recordatorios.

```javascript
// utils/calendar.js - Línea 1-55
import * as Calendar from 'expo-calendar';
import { Platform, Alert } from 'react-native';

// Línea 1: Importa funciones de calendario de Expo
// Línea 2: Importa herramientas básicas de React Native

export async function initCalendar() {
  // Línea 5: Función para inicializar permisos de calendario

  const calPerm = await Calendar.requestCalendarPermissionsAsync();
  if (calPerm.status !== 'granted') {
    Alert.alert('Permisos', 'Se requieren permisos de calendario para crear eventos.');
    return null;
  }
  return await ensureCalendarAsync();
  // Líneas 6-11: Pide permisos para acceder al calendario
  // - Si no los concede, muestra mensaje y devuelve null
  // - Si los concede, procede a crear/verificar el calendario

}

export async function ensureCalendarAsync() {
  // Línea 14: Función que asegura que existe un calendario para nuestras plantas

  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const existing = calendars.find((c) => c.name === 'Riego de Plantas');
  if (existing) return existing.id;
  // Líneas 15-17: Busca si ya existe un calendario llamado 'Riego de Plantas'
  // - Si existe, devuelve su ID único
  // - Si no existe, continúa creando uno nuevo

  const all = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const source =
    Platform.OS === 'ios'
      ? (await Calendar.getDefaultCalendarAsync()).source
      : (all.find((c) => c.source && c.source.isLocal) || all[0]).source;
  // Líneas 19-23: Determina la "fuente" del calendario según la plataforma
  // - En iOS: usa el calendario por defecto del usuario
  // - En Android: usa el primer calendario local disponible

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
  // Líneas 25-34: Crea un nuevo calendario si no existe
  // - title/name: 'Riego de Plantas'
  // - color: verde (#4CAF50)
  // - Configura permisos y propietario

}

export async function createCalendarEvent(calendarId, { title, notes, startDate }) {
  // Línea 38: Función para crear un evento en el calendario
  // - calendarId: ID del calendario donde crear el evento
  // - title: título del evento
  // - notes: descripción/notas
  // - startDate: fecha y hora del evento

  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);
  const eventId = await Calendar.createEventAsync(calendarId, {
    title,
    notes,
    startDate,
    endDate,
    timeZone: undefined,
  });
  return eventId;
  // Líneas 39-46: Crea el evento en el calendario
  // - endDate: 30 minutos después del inicio (para eventos de corta duración)
  // - Devuelve el ID único del evento creado

}

export async function deleteCalendarEvent(eventId) {
  // Línea 50: Función para eliminar un evento del calendario
  // - eventId: ID del evento a eliminar

  try {
    if (eventId) await Calendar.deleteEventAsync(eventId);
  } catch {}
  // Líneas 51-54: Elimina el evento si existe el ID
  // - try/catch para manejar errores silenciosamente
}
```

## 📁 **hooks/usePlantEvents.js** - Lógica de Estado de Eventos

Este archivo contiene la lógica central de la aplicación usando React Hooks personalizados.

```javascript
// hooks/usePlantEvents.js - Línea 1-79
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { loadEvents, saveEvents } from '../utils/storage';
import { initNotifications, scheduleNotification, cancelNotification } from '../utils/notifications';
import { initCalendar, ensureCalendarAsync, createCalendarEvent, deleteCalendarEvent } from '../utils/calendar';

// Línea 1: Importa funciones de React para manejar estado y efectos
// - useCallback: memoriza funciones para evitar re-renders innecesarios
// - useEffect: ejecuta código cuando cambian ciertas cosas
// - useRef: guarda valores que persisten entre renders
// - useState: maneja estado que puede cambiar

// Línea 2: Importa componentes básicos de React Native
// Línea 3: Importa funciones de nuestros archivos utilitarios

export function usePlantEvents() {
  // Línea 8: Define el hook personalizado usePlantEvents
  // - Este hook encapsula toda la lógica de manejo de eventos de plantas

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const calendarIdRef = useRef(null);
  // Línea 9-11: Crea estado para los eventos y loading
  // - events: lista de recordatorios de plantas
  // - loading: indicador de si se están cargando datos
  // - calendarIdRef: referencia al ID del calendario (persiste entre renders)

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
  // Líneas 13-28: Efecto que se ejecuta cuando se monta el componente
  // - Inicializa notificaciones y calendario
  // - Carga eventos guardados del almacenamiento
  // - finally siempre se ejecuta (incluso si hay error)
  // - [] significa "solo ejecutar una vez cuando se monta"

  const persist = useCallback(async (next) => {
    setEvents(next);
    await saveEvents(next);
  }, []);
  // Líneas 30-33: Función para guardar eventos actualizados
  // - useCallback evita que se recree en cada render
  // - Actualiza el estado y guarda en almacenamiento

  const addEvent = useCallback(async ({ title, plant, description, date }) => {
    if (!title?.trim() || !plant?.trim()) {
      Alert.alert('Campos requeridos', 'Título y planta son obligatorios.');
      return null;
    }
    if (date.getTime() < Date.now() + 5000) {
      Alert.alert('Fecha inválida', 'Elige una fecha futura para el recordatorio.');
      return null;
    }
    // Líneas 35-43: Validaciones antes de crear el evento
    // - Verifica que título y planta no estén vacíos
    // - Verifica que la fecha sea futura (al menos 5 segundos después)

    const niceBody = `${title.trim()} • ${plant.trim()}${description?.trim() ? ' — ' + description.trim() : ''}`;
    const calId = calendarIdRef.current || (await ensureCalendarAsync());
    const [notificationId, calendarEventId] = await Promise.all([
      scheduleNotification(date, niceBody),
      createCalendarEvent(calId, { title: `${title.trim()} (${plant.trim()})`, notes: description?.trim() || '', startDate: date }),
    ]);
    // Líneas 44-49: Crea el texto de la notificación y configura calendario
    // - niceBody: formato bonito para la notificación
    // - Promise.all ejecuta notificación y evento de calendario simultáneamente

    const newItem = {
      id: String(Date.now()),
      title: title.trim(),
      plant: plant.trim(),
      description: description?.trim() || '',
      dateISO: date.toISOString(),
      notificationId,
      calendarEventId,
    };
    // Líneas 50-58: Crea el objeto del nuevo evento
    // - id único basado en timestamp actual
    // - Guarda todos los datos necesarios

    const next = [newItem, ...events].sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
    await persist(next);
    return newItem;
  }, [events, persist]);
  // Líneas 59-62: Agrega el nuevo evento ordenado por fecha y lo guarda

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
  // Líneas 64-75: Función para eliminar eventos
  // - Cancela notificación y evento de calendario
  // - Filtra el evento eliminado de la lista
  // - Muestra mensaje de confirmación

  return { events, loading, addEvent, removeEvent };
  // Línea 77: Devuelve las funciones y estado que otros componentes necesitan
}
```

## 📁 **components/EventCard.js** - Tarjetas de Eventos

Este componente renderiza cada recordatorio de planta como una tarjeta visual atractiva.

```javascript
// components/EventCard.js - Línea 1-206
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../utils/colors';

// Línea 1: Importa React
// Línea 2: Importa componentes básicos de React Native
// Línea 3: Importa colores y estilos desde nuestro archivo de colores

const getPlantEmoji = (plantName = '') => {
  const emojis = ['🌱', '🌿', '🍀', '🌴', '🌳', '🌵', '🌺', '🌸', '🌻', '🌹'];
  const index = Math.abs(plantName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % emojis.length;
  return emojis[index];
};
// Líneas 6-10: Función para asignar un emoji único a cada planta
// - Crea una lista de emojis de plantas
// - Usa el nombre de la planta para calcular qué emoji asignar
// - El cálculo matemático asegura que la misma planta siempre tenga el mismo emoji

export default function EventCard({ item, onPress }) {
  // Línea 12: Define el componente EventCard
  // - item: datos del evento/recordatorio
  // - onPress: función a ejecutar cuando se toca la tarjeta

  const d = new Date(item.dateISO);
  const plantEmoji = getPlantEmoji(item.plant);
  const isToday = new Date().toDateString() === d.toDateString();
  const formattedTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const rawDate = d.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' });
  const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
  // Líneas 13-18: Procesa la fecha del evento
  // - Convierte la fecha ISO en objetos Date útiles
  // - Verifica si el evento es hoy
  // - Formatea hora y fecha en español

  return (
    <TouchableOpacity
      style={[styles.card, isToday && styles.cardToday]}
      onPress={() => onPress?.(item)}
      activeOpacity={0.86}
    >
      // Líneas 20-25: Crea el botón táctil de la tarjeta
      // - style: combina estilos base con estilos especiales si es hoy
      // - onPress: ejecuta la función cuando se toca
      // - activeOpacity: hace la tarjeta ligeramente transparente cuando se presiona

      <View pointerEvents="none" style={styles.cardBackdrop}>
        <View style={[styles.cardAura, styles.cardAuraPrimary]} />
        {isToday && <View style={[styles.cardAura, styles.cardAuraAccent]} />}
      </View>
      // Líneas 26-29: Crea efectos visuales de fondo
      // - pointerEvents="none": evita que estos elementos interfieran con toques
      // - cardAura: círculos de color sutiles para decoración

      <View style={styles.topRow}>
        <View style={styles.identity}>
          <View style={styles.emojiBadge}>
            <Text style={styles.emoji}>{plantEmoji}</Text>
          </View>
          <View style={styles.identityLabels}>
            <Text style={styles.plantName} numberOfLines={1}>
              {item.plant}
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        </View>
        // Líneas 31-44: Primera fila: información de la planta
        // - emojiBadge: círculo con emoji de la planta
        // - plantName: nombre de la planta
        // - title: título del recordatorio

        <View style={styles.metaColumn}>
          {isToday && <Text style={styles.todayBadge}>HOY</Text>}
          <Text style={styles.timeBadge}>{formattedTime}</Text>
        </View>
      </View>
      // Líneas 46-50: Columna derecha con metadatos
      // - todayBadge: etiqueta "HOY" si el evento es hoy
      // - timeBadge: hora del evento

      {item.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}
      // Líneas 52-56: Descripción opcional del evento
      // - Solo se muestra si existe descripción
      // - numberOfLines={2}: máximo 2 líneas de texto

      <View style={styles.footer}>
        <View style={styles.footerMeta}>
          <Text style={styles.dateLabel}>Próximo recordatorio</Text>
          <Text style={styles.dateValue}>{isToday ? 'Hoy' : formattedDate}</Text>
        </View>
        <View style={[styles.statusPip, isToday && styles.statusPipToday]} />
      </View>
    </TouchableOpacity>
  );
  // Líneas 58-66: Pie de la tarjeta con fecha y estado
  // - statusPip: punto de color que indica el estado
  // - Verde si es hoy, lima si es futuro
}
```

## 📁 **components/CreateEventModal.js** - Modal de Creación de Eventos

Este componente proporciona la interfaz para crear nuevos recordatorios de plantas.

```javascript
// components/CreateEventModal.js - Línea 1-338
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../utils/colors';

// Línea 1: Importa React y manejo de estado
// Líneas 2-13: Importa componentes necesarios para construir la interfaz
// - DateTimePicker: selector de fecha y hora
// - SafeAreaView: área segura para dispositivos con notch

export default function CreateEventModal({ visible, onClose, onSave }) {
  // Línea 18: Define el componente modal
  // - visible: controla si se muestra o no
  // - onClose: función para cerrar el modal
  // - onSave: función para guardar el nuevo evento

  const [title, setTitle] = useState('');
  const [plant, setPlant] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date(Date.now() + 5 * 60 * 1000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  // Líneas 19-24: Estado para todos los campos del formulario
  // - title, plant, description: texto del recordatorio
  // - date: fecha y hora (por defecto 5 minutos en el futuro)
  // - showDatePicker, showTimePicker: controla visibilidad de selectores

  const reset = () => {
    setTitle('');
    setPlant('');
    setDescription('');
    setDate(new Date(Date.now() + 5 * 60 * 1000));
  };
  // Líneas 26-31: Función para limpiar todos los campos
  // - Se usa después de guardar o cancelar

  const handleSave = async () => {
    const saved = await onSave?.({ title, plant, description, date });
    if (saved) {
      reset();
      onClose?.();
    }
  };
  // Líneas 33-39: Maneja el guardado del evento
  // - Llama a la función onSave pasada como prop
  // - Si se guardó exitosamente, limpia formulario y cierra modal

  const formattedDate = date.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // Líneas 41-42: Formatea fecha y hora para mostrar en la interfaz

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      // Línea 45: Crea el modal
      // - animationType="slide": entra deslizándose desde abajo
      // - onRequestClose: se ejecuta cuando el usuario intenta cerrar (ej: botón atrás)

      <SafeAreaView style={styles.modalContainer}>
        // Línea 46: Área segura para dispositivos modernos

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
        >
          // Líneas 47-51: Evita que el teclado tape los campos
          // - behavior: cómo ajustar el contenido cuando aparece teclado
          // - keyboardVerticalOffset: espacio adicional para iOS

          <View style={styles.sheet}>
            // Línea 52: Contenedor principal del modal (como una hoja)

            <ScrollView
              contentContainerStyle={styles.sheetContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              // Líneas 53-57: Área desplazable del contenido
              // - keyboardShouldPersistTaps: permite tocar mientras teclado está visible

              <View style={styles.sheetHeader}>
                <View style={styles.handle} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Nuevo ritual</Text>
                </View>
                <Text style={styles.sheetTitle}>Programar cuidado botánico</Text>
                <Text style={styles.sheetSubtitle}>
                  Define el ritual perfecto para mantener a tus plantas vibrantes y equilibradas.
                </Text>
              </View>
              // Líneas 58-67: Encabezado del modal con título y descripción

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Riego matutino"
                  placeholderTextColor={colors.text.muted}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
              // Líneas 69-78: Campo de texto para el título
              // - placeholder: texto de ejemplo
              // - onChangeText: actualiza el estado cuando cambia el texto

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Especie</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ficus lyrata"
                  placeholderTextColor={colors.text.muted}
                  value={plant}
                  onChangeText={setPlant}
                />
              </View>
              // Líneas 80-89: Campo para el nombre de la planta

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Notas</Text>
                <TextInput
                  style={[styles.input, styles.multiline]}
                  placeholder="Añade detalles, fertilizantes o rituales especiales"
                  placeholderTextColor={colors.text.muted}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                />
              </View>
              // Líneas 91-101: Campo para notas adicionales
              // - multiline: permite múltiples líneas de texto

              <View style={styles.scheduleCard}>
                <View style={styles.scheduleRow}>
                  <View>
                    <Text style={styles.scheduleLabel}>Próxima sesión</Text>
                    <Text style={styles.scheduleDate}>{formattedDate}</Text>
                  </View>
                  <TouchableOpacity style={styles.scheduleChip} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.scheduleChipText}>Cambiar fecha</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.scheduleDivider} />
                <View style={styles.scheduleRow}>
                  <View>
                    <Text style={styles.scheduleLabel}>Horario</Text>
                    <Text style={styles.scheduleDate}>{formattedTime}</Text>
                  </View>
                  <TouchableOpacity style={styles.scheduleChip} onPress={() => setShowTimePicker(true)}>
                    <Text style={styles.scheduleChipText}>Elegir hora</Text>
                  </TouchableOpacity>
                </View>
              </View>
              // Líneas 103-123: Sección para seleccionar fecha y hora
              // - scheduleChip: botones para abrir selectores de fecha/hora

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(e, selected) => {
                    setShowDatePicker(false);
                    if (selected) {
                      const next = new Date(date);
                      next.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
                      setDate(next);
                    }
                  }}
                />
              )}
              // Líneas 125-139: Selector de fecha (solo se muestra cuando showDatePicker es true)
              // - onChange: actualiza la fecha seleccionada

              {showTimePicker && (
                <DateTimePicker
                  value={date}
                  mode="time"
                  is24Hour
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(e, selected) => {
                    setShowTimePicker(false);
                    if (selected) {
                      const next = new Date(date);
                      next.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
                      setDate(next);
                    }
                  }}
                />
              )}
              // Líneas 140-155: Selector de hora (formato 24 horas)

            </ScrollView>
            // Cierra ScrollView

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {
                  reset();
                  onClose?.();
                }}
              >
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
                <Text style={styles.primaryButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
  // Líneas 158-176: Botones de acción (Cancelar/Guardar)
}
```

## 📁 **components/EventDetailModal.js** - Modal de Detalles de Evento

Este componente muestra información detallada de un recordatorio específico cuando el usuario toca una tarjeta.

```javascript
// components/EventDetailModal.js - Línea 1-320
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../utils/colors';

// Línea 1-5: Importaciones básicas

const getPlantEmoji = (plantName = '') => {
  if (!plantName) return '🌿';
  const emojis = ['🌱', '🌿', '🍀', '🌴', '🌳', '🌵', '🌺', '🌸', '🌻', '🌹'];
  const index = Math.abs(plantName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % emojis.length;
  return emojis[index];
};
// Líneas 7-12: Función para obtener emoji de planta (igual que en EventCard)

export default function EventDetailModal({ visible, onClose, event, onDelete }) {
  // Línea 14: Define el componente
  // - event: datos del evento a mostrar
  // - onDelete: función para eliminar el evento

  if (!event) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <SafeAreaView style={[styles.modalContainer, styles.emptyStateContainer]}>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🌿</Text>
            <Text style={styles.emptyTitle}>Sin evento seleccionado</Text>
            <Text style={styles.emptySubtitle}>
              Selecciona un recordatorio de tu lista para sumergirte en los detalles del ritual botánico.
            </Text>
            <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
  // Líneas 15-32: Manejo especial cuando no hay evento seleccionado
  // - Muestra un estado vacío con mensaje explicativo

  const eventDate = new Date(event.dateISO);
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const plantEmoji = getPlantEmoji(event.plant);
  // Líneas 34-41: Procesa la información del evento para mostrarla

  const handleDelete = () => {
    Alert.alert('Confirmar', '¿Eliminar este evento?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => onDelete?.(event) },
    ]);
  };
  // Líneas 43-48: Función para confirmar eliminación
  // - Muestra diálogo de confirmación antes de eliminar

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.sheet}>
          <View style={styles.sheetBackdrop}>
            <View style={[styles.blob, styles.blobOne]} />
            <View style={[styles.blob, styles.blobTwo]} />
          </View>
          // Líneas 50-57: Modal principal con efectos de fondo decorativos

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.headerRow}>
              <View style={styles.identityBadge}>
                <Text style={styles.identityEmoji}>{plantEmoji}</Text>
              </View>
              <View style={styles.identityText}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.subtitle}>{event.plant}</Text>
              </View>
            </View>
            // Líneas 59-68: Encabezado con información básica del evento

            <View style={styles.metaCard}>
              <View style={styles.metaColumn}>
                <Text style={styles.metaLabel}>Fecha programada</Text>
                <Text style={styles.metaValue}>{formattedDate}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaColumn}>
                <Text style={styles.metaLabel}>Horario</Text>
                <Text style={styles.metaValue}>{formattedTime}</Text>
              </View>
            </View>
            // Líneas 70-80: Tarjeta con fecha y hora formateadas

            {event.description ? (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Notas del ritual</Text>
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionText}>{event.description}</Text>
                </View>
              </View>
            ) : null}
            // Líneas 82-89: Sección de notas (solo si existen)

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Sugerencias de cuidado</Text>
              <View style={styles.tipList}>
                <Text style={styles.tipItem}>• Revisa la humedad del sustrato antes de cada riego.</Text>
                <Text style={styles.tipItem}>• Aprovecha luz indirecta suave para potenciar su crecimiento.</Text>
                <Text style={styles.tipItem}>• Pulveriza las hojas para mantener la frescura ambiental.</Text>
              </View>
            </View>
          </ScrollView>
          // Líneas 91-98: Consejos útiles de cuidado de plantas

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dangerButton} onPress={handleDelete}>
              <Text style={styles.dangerButtonText}>Eliminar evento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
  // Líneas 101-113: Botones de acción (Cerrar/Eliminar)
}
```

## 📁 **App.js** - Componente Principal de la Aplicación

Este es el componente raíz que integra todos los demás componentes y maneja el estado global.

```javascript
// App.js - Línea 1-352
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from './components/EventCard';
import CreateEventModal from './components/CreateEventModal';
import EventDetailModal from './components/EventDetailModal';
import { usePlantEvents } from './hooks/usePlantEvents';
import { colors, gradients, typography, spacing, borderRadius, shadows } from './utils/colors';

// Línea 1: Importa React y manejo de estado
// Línea 2: Importa componentes básicos de React Native y Expo
// Líneas 3-4: Importa nuestros componentes personalizados
// Línea 5: Importa nuestro hook personalizado
// Línea 6: Importa colores y estilos

export default function App() {
  // Línea 11: Define el componente principal App

  const { events, loading, addEvent, removeEvent } = usePlantEvents();
  // Línea 12: Usa nuestro hook personalizado para obtener eventos y funciones

  const [createVisible, setCreateVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // Líneas 13-15: Estado para controlar visibilidad de modales

  const openDetail = (item) => {
    setSelectedEvent(item);
    setDetailVisible(true);
  };
  // Líneas 17-20: Función para abrir el modal de detalles

  const onDelete = async (item) => {
    await removeEvent(item);
    setDetailVisible(false);
    setSelectedEvent(null);
  };
  // Líneas 22-26: Función para eliminar eventos

  const renderItem = ({ item }) => (
    <EventCard item={item} onPress={openDetail} />
  );
  // Líneas 27-29: Función para renderizar cada elemento de la lista

  const emptyComponent = (
    <View style={styles.emptyBox}>
      <View style={styles.emptyIconBadge}>
        <Text style={styles.emptyIcon}>🌿</Text>
      </View>
      <Text style={styles.emptyTitle}>Tu invernadero espera</Text>
      <Text style={styles.emptyText}>
        No hay eventos. Diseña un nuevo ritual para tus plantas y deja que los recordatorios hagan el resto.
      </Text>
      <TouchableOpacity style={styles.emptyCta} onPress={() => setCreateVisible(true)}>
        <Text style={styles.emptyCtaText}>Crear recordatorio</Text>
      </TouchableOpacity>
    </View>
  );
  // Líneas 31-44: Componente para cuando no hay eventos

  const header = (
    <View style={styles.hero}>
      <View style={styles.heroBackdrop}>
        <View style={[styles.heroBlob, styles.heroBlobOne, { backgroundColor: gradients.canopy[1] }]} />
        <View style={[styles.heroBlob, styles.heroBlobTwo, { backgroundColor: gradients.sunrise[0] }]} />
        <View style={[styles.heroBlob, styles.heroBlobThree, { backgroundColor: gradients.sunrise[2] }]} />
      </View>
      <View style={styles.heroContent}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Botanical Studio</Text>
        </View>
        <Text style={styles.heroTitle}>Recordatorios de plantas</Text>
        <Text style={styles.heroSubtitle}>
          Curamos el ritual de cuidado. Organiza, anticipa y deja que tus especies prosperen con recordatorios suaves y precisos.
        </Text>

        <View style={styles.heroStatsContainer}>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatNumber}>{events.length}</Text>
            <Text style={styles.heroStatLabel}>Agendados</Text>
          </View>
          <View style={styles.heroStatCardSecondary}>
            <Text style={styles.heroStatNumber}>+12</Text>
            <Text style={styles.heroStatLabel}>Horas cuidadas</Text>
          </View>
        </View>
      </View>
    </View>
  );
  // Líneas 46-74: Encabezado con estadísticas y diseño atractivo

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {header}
      <View style={styles.contentSurface}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={!loading ? emptyComponent : null}
          contentContainerStyle={events.length === 0 ? styles.emptyListContainer : styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      // Líneas 76-90: Lista principal de eventos

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.88}
        onPress={() => setCreateVisible(true)}
      >
        <View pointerEvents="none" style={styles.fabAura} />
        <View style={styles.fabButton}>
          <Text style={styles.fabIcon}>✦</Text>
        </View>
        <View style={styles.fabLabelPill}>
          <Text style={styles.fabLabel}>Agregar evento</Text>
        </View>
      </TouchableOpacity>
      // Líneas 92-104: Botón flotante para agregar eventos

      <CreateEventModal
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        onSave={addEvent}
      />
      // Líneas 107-111: Modal para crear eventos

      <EventDetailModal
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
        event={selectedEvent}
        onDelete={onDelete}
      />
      // Líneas 114-119: Modal para ver detalles de eventos

    </SafeAreaView>
  );
  // Líneas 121-122: Cierre del componente
}
```

## 🚀 Características Principales

### ✅ **Gestión de Recordatorios**
- Crear eventos personalizados para cuidado de plantas
- Programar fechas y horas específicas
- Añadir títulos, nombres de plantas y descripciones detalladas

### ✅ **Notificaciones Push**
- Recordatorios automáticos cuando llega la hora programada
- Integración completa con el sistema de notificaciones del dispositivo
- Configuración de canales específicos para Android

### ✅ **Integración con Calendario**
- Creación automática de eventos en el calendario nativo
- Sincronización perfecta entre la aplicación y el calendario del teléfono
- Gestión automática de permisos de calendario

### ✅ **Interfaz de Usuario Atractiva**
- Diseño moderno con colores inspirados en la naturaleza
- Efectos visuales sutiles (sombras, gradientes, transparencias)
- Interfaz responsiva que funciona en diferentes tamaños de pantalla

### ✅ **Persistencia de Datos**
- Almacenamiento local usando AsyncStorage
- Los datos persisten incluso después de cerrar la aplicación
- Sincronización automática entre almacenamiento y estado de la aplicación

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework para desarrollo de aplicaciones móviles
- **Expo**: Plataforma para facilitar el desarrollo y despliegue
- **AsyncStorage**: Almacenamiento local persistente
- **Expo Notifications**: Sistema de notificaciones push
- **Expo Calendar**: Integración con calendario nativo

## 📱 Plataformas Soportadas

- ✅ **iOS**: Compatible con iPhone y iPad
- ✅ **Android**: Compatible con teléfonos y tablets Android

## 🔧 Instalación y Uso

1. **Instalar dependencias**: `npm install`
2. **Ejecutar en desarrollo**: `npm start` o `expo start`
3. **Conceder permisos**: La aplicación solicitará permisos para notificaciones y calendario
4. **Crear recordatorios**: Usar el botón flotante para añadir nuevos eventos
5. **Gestionar eventos**: Tocar las tarjetas para ver detalles y eliminar eventos

## 🎨 Diseño y UX

La aplicación sigue principios de diseño modernos:
- **Colores naturales**: Paleta inspirada en jardines botánicos
- **Tipografía clara**: Jerarquía visual bien definida
- **Espaciado consistente**: Sistema de diseño uniforme
- **Microinteracciones**: Efectos sutiles para mejorar la experiencia

---

*Este README proporciona una documentación completa y detallada de toda la base de código de Botanical Studio, explicando cada archivo y función de manera comprensiva para desarrolladores de todos los niveles.*
