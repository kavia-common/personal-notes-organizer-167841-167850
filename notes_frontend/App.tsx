import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppNavigator from './src/navigation';
import { OceanProfessional as T } from './src/theme/colors';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: T.background }}>
      <StatusBar style="dark" />
      <AppNavigator />
    </View>
  );
}
