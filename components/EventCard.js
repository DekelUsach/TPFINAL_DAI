// components/EventCard.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function EventCard({ item, onPress }) {
  const d = new Date(item.dateISO);
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(item)}>
      <Text style={styles.cardTitle}>{item.title} • {item.plant}</Text>
      <Text style={styles.cardSubtitle}>
        {d.toLocaleDateString()} {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
      {!!item.description && <Text style={styles.cardDesc} numberOfLines={1}>{item.description}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  cardSubtitle: {
    marginTop: 4,
    color: '#555',
  },
  cardDesc: {
    marginTop: 6,
    color: '#777',
  },
});
