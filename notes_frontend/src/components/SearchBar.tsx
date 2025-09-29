import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { OceanProfessional as T } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { Ionicons } from '@expo/vector-icons';

/**
 * PUBLIC INTERFACE
 * SearchBar props:
 * - value: current input value
 * - onChange: input change handler
 * - placeholder: optional placeholder text
 */
type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

// PUBLIC_INTERFACE
export const SearchBar: React.FC<Props> = ({ value, onChange, placeholder = 'Search notes...' }) => {
  /** Minimal search bar with icon and rounded corners. */
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={T.mutedText} style={{ marginRight: spacing.sm }} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={T.mutedText}
        value={value}
        onChangeText={onChange}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: T.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: T.border,
  },
  input: {
    flex: 1,
    color: T.text,
    fontSize: 16,
  },
});
