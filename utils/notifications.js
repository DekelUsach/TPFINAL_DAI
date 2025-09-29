// utils/notifications.js
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

export async function initNotifications() {
  // Foreground handling
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
    }),
  });

  // Permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Permisos', 'Se requieren permisos de notificaciones para avisarte cuando regar.');
  }

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
}

export async function scheduleNotification(date, body) {
  const trigger = date;
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio de riego 💧',
      body,
      sound: 'default',
    },
    trigger: Platform.OS === 'android' ? { channelId: 'watering', date: trigger } : trigger,
  });
  return id;
}

export async function cancelNotification(id) {
  try {
    if (id) await Notifications.cancelScheduledNotificationAsync(id);
  } catch {}
}
