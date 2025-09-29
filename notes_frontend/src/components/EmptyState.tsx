import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { OceanProfessional as T } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = {
  title: string;
  subtitle?: string;
  // Optional local image require; if not provided, show a simple emoji.
  imageSource?: ImageSourcePropType;
};

// PUBLIC_INTERFACE
export const EmptyState: React.FC<Props> = ({ title, subtitle, imageSource }) => {
  /** Renders an empty state with optional image and messages. */
  return (
    <View style={styles.container}>
      {imageSource ? (
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      ) : (
        <Text style={styles.emoji}>📝</Text>
      )}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: spacing.xxl },
  image: { width: 140, height: 140, marginBottom: spacing.lg, opacity: 0.9 },
  emoji: { fontSize: 64, marginBottom: spacing.lg },
  title: { color: T.text, fontWeight: '800', fontSize: 20, marginBottom: spacing.sm },
  subtitle: { color: T.mutedText, textAlign: 'center', paddingHorizontal: spacing.xl },
});
