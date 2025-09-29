// components/EventDetailModal.js
import React from 'react';
import { Modal, View, Text, Button, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventDetailModal({ visible, onClose, event, onDelete }) {
  if (!event) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <SafeAreaView style={styles.modalContainer}>
          <Text>No hay evento seleccionado.</Text>
          <View style={styles.footerRow}>
            <Button title="Cerrar" onPress={onClose} />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Detalle del evento</Text>
        <Text style={styles.detailTitle}>{event.title}</Text>
        <Text style={styles.detailItem}>Planta: <Text style={styles.value}>{event.plant}</Text></Text>
        <Text style={styles.detailItem}>Fecha: <Text style={styles.value}>{new Date(event.dateISO).toLocaleDateString()}</Text></Text>
        <Text style={styles.detailItem}>Hora: <Text style={styles.value}>{new Date(event.dateISO).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></Text>
        {!!event.description && (
          <Text style={styles.detailItem}>Descripción: <Text style={styles.value}>{event.description}</Text></Text>
        )}

        <View style={styles.footerRow}>
          <Button title="Cerrar" onPress={onClose} />
          <Button
            title="Eliminar"
            color="#d32f2f"
            onPress={() =>
              Alert.alert('Confirmar', '¿Eliminar este evento?', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => onDelete?.(event) },
              ])
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#222',
  },
  value: { color: '#333' },
  footerRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  detailItem: {
    marginVertical: 4,
    color: '#444',
  },
});
