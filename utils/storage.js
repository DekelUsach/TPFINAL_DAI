// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = '@plant_events_v1';

export async function loadEvents() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Error loading events', e);
    return [];
  }
}

export async function saveEvents(events) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.warn('Error saving events', e);
  }
}
