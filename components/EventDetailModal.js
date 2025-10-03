// components/EventDetailModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../utils/colors';

const getPlantEmoji = (plantName = '') => {
  if (!plantName) return '🌿';
  const emojis = ['🌱', '🌿', '🍀', '🌴', '🌳', '🌵', '🌺', '🌸', '🌻', '🌹'];
  const index = Math.abs(plantName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % emojis.length;
  return emojis[index];
};

export default function EventDetailModal({ visible, onClose, event, onDelete }) {
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

  const eventDate = new Date(event.dateISO);
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const plantEmoji = getPlantEmoji(event.plant);

  const handleDelete = () => {
    Alert.alert('Confirmar', '¿Eliminar este evento?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => onDelete?.(event) },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.sheet}>
          <View style={styles.sheetBackdrop}>
            <View style={[styles.blob, styles.blobOne]} />
            <View style={[styles.blob, styles.blobTwo]} />
          </View>

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

            {event.description ? (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Notas del ritual</Text>
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionText}>{event.description}</Text>
                </View>
              </View>
            ) : null}

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Sugerencias de cuidado</Text>
              <View style={styles.tipList}>
                <Text style={styles.tipItem}>• Revisa la humedad del sustrato antes de cada riego.</Text>
                <Text style={styles.tipItem}>• Aprovecha luz indirecta suave para potenciar su crecimiento.</Text>
                <Text style={styles.tipItem}>• Pulveriza las hojas para mantener la frescura ambiental.</Text>
              </View>
            </View>
          </ScrollView>

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
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.primary.ultraDark,
    justifyContent: 'flex-end',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCard: {
    width: '88%',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    backgroundColor: colors.surface.raised,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.md,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  emptySubtitle: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.md * typography.lineHeight.standard,
  },
  sheet: {
    backgroundColor: colors.surface.raised,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    ...shadows.lg,
    position: 'relative',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },
  blob: {
    position: 'absolute',
    opacity: 0.4,
    borderRadius: borderRadius.full,
  },
  blobOne: {
    width: 220,
    height: 220,
    top: -80,
    right: -40,
    backgroundColor: colors.glow.primary,
  },
  blobTwo: {
    width: 180,
    height: 180,
    bottom: -60,
    left: -20,
    backgroundColor: colors.glow.accent,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  identityBadge: {
    width: 68,
    height: 68,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface.muted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surface.outline,
  },
  identityEmoji: {
    fontSize: 34,
  },
  identityText: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    color: colors.text.dominant,
    fontWeight: typography.fontWeight.bold,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  metaCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.surface.outline,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: spacing.lg,
  },
  metaColumn: {
    flex: 1,
    gap: spacing.xs,
  },
  metaLabel: {
    fontSize: typography.fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.text.muted,
  },
  metaValue: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  metaDivider: {
    width: 1,
    height: '70%',
    backgroundColor: colors.surface.outline,
    opacity: 0.5,
  },
  section: {
    gap: spacing.sm,
  },
  sectionLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: colors.surface.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.surface.outline,
    padding: spacing.md,
  },
  sectionText: {
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.lg * typography.lineHeight.standard,
    color: colors.text.primary,
  },
  tipList: {
    backgroundColor: colors.surface.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.surface.outline,
    padding: spacing.md,
    gap: spacing.xs,
  },
  tipItem: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.md * typography.lineHeight.standard,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
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
  dangerButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.states.danger,
    alignItems: 'center',
    ...shadows.md,
  },
  dangerButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
});
