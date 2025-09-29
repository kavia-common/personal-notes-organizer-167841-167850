import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OceanProfessional as T } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Header } from '../components/Header';

/**
 * PUBLIC INTERFACE
 * AboutScreen: Informational screen about the app, theme, and basic usage.
 */
export const AboutScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <Header title="About" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Personal Notes Organizer</Text>
        <Text style={styles.subtitle}>Theme: Ocean Professional</Text>
        <View style={styles.section}>
          <Text style={styles.h3}>What you can do</Text>
          <Text style={styles.p}>- Create and edit notes with a clean editor.</Text>
          <Text style={styles.p}>- Organize with search, sort, and tags.</Text>
          <Text style={styles.p}>- Notes are stored locally for now; backend integration stubs are ready.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.h3}>Design</Text>
          <Text style={styles.p}>
            Primary {T.primary}, Secondary {T.secondary}, Background {T.background}, Surface {T.surface}, Text {T.text}.
          </Text>
          <Text style={styles.p}>Modern aesthetic with rounded corners and subtle shadows.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.h3}>Privacy</Text>
          <Text style={styles.p}>Your notes are saved on this device using AsyncStorage until a backend is configured.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.background },
  container: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: { color: T.text, fontSize: 22, fontWeight: '800', marginTop: spacing.lg },
  subtitle: { color: T.mutedText, marginTop: spacing.xs, marginBottom: spacing.lg },
  section: { marginTop: spacing.lg },
  h3: { color: T.text, fontWeight: '800', marginBottom: spacing.xs },
  p: { color: T.text, opacity: 0.9, marginBottom: spacing.xs, lineHeight: 20 },
});
