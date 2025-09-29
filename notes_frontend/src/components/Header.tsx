import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OceanProfessional as T } from '../theme/colors';
import { spacing } from '../theme/spacing';

/**
 * PUBLIC INTERFACE
 * Header props:
 * - title: string displayed in the header
 * - right: optional right-side content (actions)
 */
type Props = {
  title: string;
  right?: React.ReactNode;
};

// PUBLIC_INTERFACE
export const Header: React.FC<Props> = ({ title, right }) => {
  /** Themed header for screens. */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl + 8,
    paddingBottom: spacing.md,
    backgroundColor: T.background,
    borderBottomWidth: 1,
    borderBottomColor: T.border,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    color: T.text,
    fontWeight: '800',
    fontSize: 24,
  },
  right: {
    marginLeft: spacing.md,
  },
});
