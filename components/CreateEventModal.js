// components/CreateEventModal.js
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

  const formattedDate = date.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
        >
          <View style={styles.sheet}>
            <ScrollView
              contentContainerStyle={styles.sheetContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
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
            </ScrollView>

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
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.primary.ultraDark,
    justifyContent: 'flex-end',
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.surface.raised,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    ...shadows.lg,
  },
  sheetContent: {
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  sheetHeader: {
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  handle: {
    alignSelf: 'center',
    width: 58,
    height: 5,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface.outline,
    marginBottom: spacing.sm,
  },
  badge: {
    backgroundColor: colors.surface.muted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.surface.outline,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    letterSpacing: 1,
    color: colors.text.primary,
    textTransform: 'uppercase',
  },
  sheetTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dominant,
  },
  sheetSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.lg * typography.lineHeight.standard,
  },
  fieldGroup: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: 0.3,
  },
  input: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.surface.outline,
    backgroundColor: colors.surface.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  scheduleCard: {
    backgroundColor: colors.surface.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.surface.outline,
    padding: spacing.md,
    gap: spacing.md,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleLabel: {
    fontSize: typography.fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.text.muted,
  },
  scheduleDate: {
    marginTop: spacing.xs,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  scheduleChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.states.infoSoft,
  },
  scheduleChipText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  scheduleDivider: {
    height: 1,
    backgroundColor: colors.surface.outline,
    opacity: 0.5,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface.muted,
    borderWidth: 1,
    borderColor: colors.surface.outline,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    ...shadows.md,
  },
  primaryButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
});
