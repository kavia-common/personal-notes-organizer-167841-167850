import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { OceanProfessional as T } from '../theme/colors';
import { spacing, radius, shadow } from '../theme/spacing';
import { SortOption } from '../types/note';
import { Ionicons } from '@expo/vector-icons';

/**
 * PUBLIC INTERFACE
 * SortMenu props:
 * - value: current sort option
 * - onChange: callback invoked with new sort option
 */
type Props = {
  value: SortOption;
  onChange: (v: SortOption) => void;
};

// PUBLIC_INTERFACE
export const SortMenu: React.FC<Props> = ({ value, onChange }) => {
  /** Simple sort dropdown-like menu. */
  const [open, setOpen] = React.useState(false);
  const labelMap: Record<SortOption, string> = {
    updated_desc: 'Recent',
    updated_asc: 'Oldest',
    title_asc: 'Title A-Z',
    title_desc: 'Title Z-A',
    created_desc: 'Newly Created',
    created_asc: 'Oldest Created',
  };

  return (
    <View style={styles.root}>
      <Pressable onPress={() => setOpen(o => !o)} style={styles.button}>
        <Ionicons name="filter" size={16} color={T.mutedText} style={{ marginRight: spacing.sm }} />
        <Text style={[styles.buttonText, { marginRight: spacing.sm }]}>{labelMap[value]}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color={T.mutedText} />
      </Pressable>
      {open ? (
        <View style={styles.menu}>
          {(Object.keys(labelMap) as SortOption[]).map(opt => (
            <Pressable
              key={opt}
              onPress={() => {
                onChange(opt);
                setOpen(false);
              }}
              style={({ pressed }) => [styles.menuItem, pressed && { backgroundColor: T.background }]}
            >
              <Text style={[styles.menuText, opt === value && { color: T.primary, fontWeight: '700' }]}>
                {labelMap[opt]}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { position: 'relative' },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: T.surface,
    borderColor: T.border,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  } as const,
  buttonText: {
    color: T.mutedText,
    fontSize: 14,
    marginRight: spacing.sm,
  },
  menu: {
    position: 'absolute',
    top: Platform.select({ ios: 44, android: 44, default: 44 }),
    right: 0,
    width: 200,
    backgroundColor: T.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: T.border,
    paddingVertical: spacing.xs,
    ...shadow.card,
    zIndex: 100,
  },
  menuItem: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  menuText: {
    color: T.text,
    fontSize: 14,
  },
});
