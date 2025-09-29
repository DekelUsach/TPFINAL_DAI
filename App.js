import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from './components/EventCard';
import CreateEventModal from './components/CreateEventModal';
import EventDetailModal from './components/EventDetailModal';
import { usePlantEvents } from './hooks/usePlantEvents';

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
      <Text style={styles.emptyText}>No hay eventos. Crea uno para recordar regar tus plantas.</Text>
    </View>
  );

  const header = (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Recordatorios de Plantas</Text>
      <Button title="Nuevo" onPress={() => setCreateVisible(true)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {header}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={!loading ? emptyComponent : null}
        contentContainerStyle={events.length === 0 ? { flex: 1 } : null}
      />

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

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e5e5',
    marginLeft: 16,
  },
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
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
  },
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
