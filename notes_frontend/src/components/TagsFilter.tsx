import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Tag } from '../types/note';
import { OceanProfessional as T } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = {
  tags: Tag[];
  selectedIds: string[];
  onToggle: (tagId: string) => void;
};

// PUBLIC_INTERFACE
export const TagsFilter: React.FC<Props> = ({ tags, selectedIds, onToggle }) => {
  /** Horizontal list of tag chips that toggle selection for filtering. */
  if (!tags.length) return null;
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {tags.map(tag => {
          const selected = selectedIds.includes(tag.id);
          return (
            <Pressable
              key={tag.id}
              onPress={() => onToggle(tag.id)}
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: selected ? (tag.color ?? '#E0E7FF') : T.surface,
                  opacity: pressed ? 0.92 : 1,
                  borderColor: selected ? (tag.color ?? T.primary) : T.border,
                },
              ]}
            >
              <Text style={[styles.chipText, selected && { fontWeight: '800', color: T.text }]}>{tag.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: spacing.lg },
  row: { paddingRight: spacing.lg },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginRight: spacing.sm,
  },
  chipText: { color: T.mutedText, fontSize: 13 },
});
