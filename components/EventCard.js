// components/EventCard.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../utils/colors';

const getPlantEmoji = (plantName = '') => {
  const emojis = ['🌱', '🌿', '🍀', '🌴', '🌳', '🌵', '🌺', '🌸', '🌻', '🌹'];
  const index = Math.abs(plantName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % emojis.length;
  return emojis[index];
};

export default function EventCard({ item, onPress }) {
  const d = new Date(item.dateISO);
  const plantEmoji = getPlantEmoji(item.plant);
  const isToday = new Date().toDateString() === d.toDateString();
  const formattedTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const rawDate = d.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' });
  const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
  
  return (
    <TouchableOpacity
      style={[styles.card, isToday && styles.cardToday]}
      onPress={() => onPress?.(item)}
      activeOpacity={0.86}
    >
      <View pointerEvents="none" style={styles.cardBackdrop}>
        <View style={[styles.cardAura, styles.cardAuraPrimary]} />
        {isToday && <View style={[styles.cardAura, styles.cardAuraAccent]} />}
      </View>

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

        <View style={styles.metaColumn}>
          {isToday && <Text style={styles.todayBadge}>HOY</Text>}
          <Text style={styles.timeBadge}>{formattedTime}</Text>
        </View>
      </View>

      {item.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <View style={styles.footerMeta}>
          <Text style={styles.dateLabel}>Próximo recordatorio</Text>
          <Text style={styles.dateValue}>{isToday ? 'Hoy' : formattedDate}</Text>
        </View>
        <View style={[styles.statusPip, isToday && styles.statusPipToday]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface.raised,
    borderWidth: 1,
    borderColor: colors.surface.outline,
    ...shadows.md,
  },
  cardToday: {
    borderColor: colors.primary.light,
    backgroundColor: colors.surface.base,
  },
  cardBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  cardAura: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: borderRadius.full,
    opacity: 0.4,
  },
  cardAuraPrimary: {
    top: -100,
    right: -60,
    backgroundColor: colors.glow.primary,
  },
  cardAuraAccent: {
    bottom: -90,
    left: -40,
    backgroundColor: colors.glow.accent,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emojiBadge: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface.muted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surface.outline,
    marginRight: spacing.sm,
  },
  emoji: {
    fontSize: 26,
  },
  identityLabels: {
    flex: 1,
  },
  plantName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  title: {
    marginTop: spacing.xs,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  metaColumn: {
    alignItems: 'flex-end',
    marginLeft: spacing.sm,
  },
  todayBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.states.success,
    color: colors.text.inverse,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  timeBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.states.infoSoft,
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  description: {
    marginTop: spacing.md,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.lg * typography.lineHeight.standard,
  },
  footer: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerMeta: {
    flex: 1,
  },
  dateLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.xxs,
  },
  dateValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  statusPip: {
    width: 16,
    height: 16,
    borderRadius: borderRadius.full,
    backgroundColor: colors.accent.lime,
    borderWidth: 2,
    borderColor: colors.surface.raised,
  },
  statusPipToday: {
    backgroundColor: colors.states.success,
  },
});
