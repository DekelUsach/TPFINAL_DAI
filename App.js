import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from './components/EventCard';
import CreateEventModal from './components/CreateEventModal';
import EventDetailModal from './components/EventDetailModal';
import { usePlantEvents } from './hooks/usePlantEvents';
import { colors, gradients, typography, spacing, borderRadius, shadows } from './utils/colors';

export default function App() {
  const { events, loading, addEvent, removeEvent } = usePlantEvents();
  const [createVisible, setCreateVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openDetail = (item) => {
    setSelectedEvent(item);
    setDetailVisible(true);
  };

  const onDelete = async (item) => {
    await removeEvent(item);
    setDetailVisible(false);
    setSelectedEvent(null);
  };
  const renderItem = ({ item }) => (
    <EventCard item={item} onPress={openDetail} />
  );

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

      {/* Create Event Modal */}
      <CreateEventModal
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        onSave={addEvent}
      />

      {/* Detail Modal */}
      <EventDetailModal
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
        event={selectedEvent}
        onDelete={onDelete}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.base,
  },
  hero: {
    backgroundColor: colors.primary.dark,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    overflow: 'hidden',
  },
  heroBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  heroBlob: {
    position: 'absolute',
    backgroundColor: colors.primary.light,
    opacity: 0.55,
    borderRadius: borderRadius.full,
    transform: [{ scale: 1.1 }],
  },
  heroBlobOne: {
    width: 220,
    height: 220,
    top: -60,
    left: -40,
    backgroundColor: gradients.canopy[1],
  },
  heroBlobTwo: {
    width: 180,
    height: 180,
    bottom: -40,
    right: -20,
    backgroundColor: gradients.sunrise[0],
  },
  heroBlobThree: {
    width: 140,
    height: 140,
    top: 40,
    right: 80,
    backgroundColor: gradients.sunrise[2],
  },
  heroContent: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
    position: 'relative',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface.translucent,
    borderColor: 'rgba(244, 255, 247, 0.6)',
    borderWidth: 1,
    borderRadius: borderRadius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    ...shadows.sm,
  },
  heroBadgeText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.sm,
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.inverse,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    fontSize: typography.fontSize.md,
    color: 'rgba(244, 255, 247, 0.82)',
    lineHeight: typography.fontSize.lg * typography.lineHeight.spacious,
    maxWidth: '88%',
  },
  heroStatsContainer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: colors.surface.translucent,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(244, 255, 247, 0.5)',
    ...shadows.sm,
  },
  heroStatCardSecondary: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(244, 255, 247, 0.25)',
    ...shadows.sm,
  },
  heroStatNumber: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.inverse,
  },
  heroStatLabel: {
    marginTop: spacing.xxs,
    fontSize: typography.fontSize.sm,
    color: 'rgba(244, 255, 247, 0.7)',
    letterSpacing: 1,
  },
  contentSurface: {
    flex: 1,
    marginTop: -spacing.xl,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  listContainer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
  },
  separator: {
    height: spacing.xs,
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: colors.surface.raised,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    ...shadows.sm,
    gap: spacing.sm,
  },
  emptyIconBadge: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.states.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  emptyText: {
    marginTop: spacing.sm,
    textAlign: 'center',
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.lg * typography.lineHeight.standard,
    maxWidth: '88%',
  },
  emptyCta: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primary.main,
  },
  emptyCtaText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  fabAura: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: borderRadius.full,
    backgroundColor: colors.glow.accent,
    opacity: 0.5,
    top: -30,
    left: -37,
  },
  fabButton: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent.orchid,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    ...shadows.lg,
  },
  fabIcon: {
    fontSize: 30,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 2,
  },
  fabLabelPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.surface.translucent,
    borderWidth: 1,
    borderColor: 'rgba(30, 92, 52, 0.22)',
    ...shadows.sm,
  },
  fabLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.dark,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.8,
  },
});
