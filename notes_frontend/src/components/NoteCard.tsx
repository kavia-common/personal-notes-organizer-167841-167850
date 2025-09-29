import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Note } from '../types/note';
import { formatDateTime } from '../utils/dates';
import { OceanProfessional as T } from '../theme/colors';
import { radius, shadow, spacing } from '../theme/spacing';

/**
 * PUBLIC INTERFACE
 * NoteCard props:
 * - note: the Note to display
 * - onPress: callback when card is pressed
 */
type Props = {
  note: Note;
  onPress: (note: Note) => void;
};

// PUBLIC_INTERFACE
export const NoteCard: React.FC<Props> = ({ note, onPress }) => {
  /** A card item showing note title, snippet, and timestamps. */
  const snippet = note.content.replace(/\n+/g, ' ').slice(0, 120);
  const updated = `Updated ${formatDateTime(note.updatedAt)}`;

  return (
    <Pressable onPress={() => onPress(note)} style={({ pressed }) => [styles.card, pressed && { opacity: 0.96 }]}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>
          {note.title || 'Untitled'}
        </Text>
        {note.pinned ? <Text style={styles.pinned}>PINNED</Text> : null}
      </View>
      {snippet ? <Text numberOfLines={2} style={styles.snippet}>{snippet}</Text> : null}
      <Text style={styles.meta}>Updated {updated}</Text>
      {note.tags && note.tags.length > 0 ? (
        <View style={styles.tags}>
          {note.tags.slice(0, 3).map(tag => (
            <View key={tag.id} style={[styles.tagChip, { backgroundColor: tag.color ?? '#E0E7FF' }]}>
              <Text style={styles.tagText}>{tag.name}</Text>
            </View>
          ))}
          {note.tags.length > 3 ? <Text style={styles.more}>+{note.tags.length - 3}</Text> : null}
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: T.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: T.border,
    ...shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    color: T.text,
    fontSize: 18,
    fontWeight: '700',
  },
  pinned: {
    color: T.secondary,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: spacing.sm,
  },
  snippet: {
    color: T.mutedText,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  meta: {
    color: T.mutedText,
    fontSize: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
    // Use row gap via margin on children since RN lacks 'gap' type
  } as const,
  tagChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  tagText: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '600',
  },
  more: {
    color: T.mutedText,
    fontSize: 12,
    alignSelf: 'center',
  },
});
