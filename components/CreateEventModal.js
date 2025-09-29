// components/CreateEventModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateEventModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [plant, setPlant] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date(Date.now() + 5 * 60 * 1000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const reset = () => {
    setTitle('');
    setPlant('');
    setDescription('');
    setDate(new Date(Date.now() + 5 * 60 * 1000));
  };

  const handleSave = async () => {
    const saved = await onSave?.({ title, plant, description, date });
    if (saved) {
      reset();
      onClose?.();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Nuevo evento</Text>
        <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Planta" value={plant} onChangeText={setPlant} />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Descripción (opcional)"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Fecha y hora</Text>
          <Text style={styles.value}>
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <View style={styles.row}>
          <Button title="Elegir fecha" onPress={() => setShowDatePicker(true)} />
          <View style={{ width: 12 }} />
          <Button title="Elegir hora" onPress={() => setShowTimePicker(true)} />
        </View>

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

        <View style={styles.footerRow}>
          <Button title="Cancelar" color="#888" onPress={onClose} />
          <Button title="Guardar" onPress={handleSave} />
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
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  value: {
    color: '#333',
  },
  footerRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
