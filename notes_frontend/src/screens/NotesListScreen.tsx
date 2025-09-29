import React from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { OceanProfessional as T } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { SortMenu } from '../components/SortMenu';
import { FAB } from '../components/FAB';
import { Note, SortOption } from '../types/note';
import { createNote, getNotes, searchNotes, sortNotes, getTags } from '../services/api';
import { NoteCard } from '../components/NoteCard';
import { TagsFilter } from '../components/TagsFilter';
import { EmptyState } from '../components/EmptyState';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  NotesList: undefined;
  NoteDetail: { id?: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'NotesList'>;

/**
 * PUBLIC INTERFACE
 * NotesListScreen: Displays notes as cards with search, sort, pull-to-refresh and FAB to create new notes.
 * Navigation:
 * - navigates to NoteDetail with selected note id
 */
export const NotesListScreen: React.FC<Props> = ({ navigation }) => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [query, setQuery] = React.useState('');
  const [sort, setSort] = React.useState<SortOption>('updated_desc');
  const [refreshing, setRefreshing] = React.useState(false);
  const [allTags, setAllTags] = React.useState([]);
  const [selectedTagIds, setSelectedTagIds] = React.useState<string[]>([]);

  const load = React.useCallback(async () => {
    const data = await getNotes();
    setNotes(data);
    const tags = await getTags();
    // @ts-expect-error narrow at usage time
    setAllTags(tags);
  }, []);

  React.useEffect(() => {
    const unsub = navigation.addListener('focus', load);
    load();
    // Developer tip: uncomment to seed example notes on first run
    // import('../utils/seed').then(m => m.seedExampleNotes().then(load));
    return unsub;
  }, [navigation, load]);

  const onAdd = async () => {
    const created = await createNote({ title: 'New note', content: '' });
    navigation.navigate('NoteDetail', { id: created.id });
  };

  const filtered = React.useMemo(() => {
    let base = searchNotes(notes, query);
    if (selectedTagIds.length) {
      base = base.filter(n => (n.tags || []).some(t => selectedTagIds.includes(t.id)));
    }
    return sortNotes(base, sort);
  }, [notes, query, sort, selectedTagIds]);

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="My Notes"
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SortMenu value={sort} onChange={setSort} />
            <View style={{ width: spacing.md }} />
            {/* Info button to About */}
            <Text onPress={() => navigation.navigate('About')} style={{ color: T.primary, fontWeight: '700' }}>
              About
            </Text>
          </View>
        }
      />
      <View style={styles.container}>
        <SearchBar value={query} onChange={setQuery} />
        <TagsFilter
          // @ts-expect-error tags type is inferred from service
          tags={allTags}
          selectedIds={selectedTagIds}
          onToggle={(id) =>
            setSelectedTagIds((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
          }
        />
        {filtered.length === 0 ? (
          <EmptyState
            title="No notes yet"
            subtitle="Tap the + button to create your first note."
          />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingTop: spacing.lg, paddingBottom: 120 }}
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                onPress={(n) => navigation.navigate('NoteDetail', { id: n.id })}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await load(); setRefreshing(false); }} />
            }
          />
        )}
        <FAB onPress={onAdd} testID="fab-add-note" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.background },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    backgroundColor: T.background,
  },
  empty: { alignItems: 'center', paddingTop: spacing.xxl },
  emptyTitle: { color: T.text, fontWeight: '800', fontSize: 20, marginBottom: spacing.sm },
  emptySub: { color: T.mutedText },
});
