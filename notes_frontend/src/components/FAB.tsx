import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { OceanProfessional as T } from '../theme/colors';
import { radius, shadow } from '../theme/spacing';
import { Ionicons } from '@expo/vector-icons';

/**
 * PUBLIC INTERFACE
 * Floating Action Button component props.
 * - onPress: handler when FAB is pressed
 * - icon: Ionicons name
 * - color: icon color
 * - backgroundColor: button background color
 * - testID: testing identifier
 */
type Props = {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  backgroundColor?: string;
  testID?: string;
};

// PUBLIC_INTERFACE
export const FAB: React.FC<Props> = ({ onPress, icon = 'add', color = '#fff', backgroundColor = T.primary, testID }) => {
  /** Floating Action Button with icon. */
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor, opacity: pressed ? 0.9 : 1 },
        ]}
      >
        <Ionicons name={icon} size={26} color={color} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 28,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
});
