import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotesListScreen } from '../screens/NotesListScreen';
import { NoteDetailScreen } from '../screens/NoteDetailScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { OceanProfessional as T } from '../theme/colors';

export type RootStackParamList = {
  NotesList: undefined;
  NoteDetail: { id?: string };
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: T.primary,
    background: T.background,
    card: T.surface,
    text: T.text,
    border: T.border,
    notification: T.secondary,
  },
};

/**
 * PUBLIC INTERFACE
 * AppNavigator: Root stack navigator for the app with NotesList, NoteDetail, and About screens.
 */
export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NotesList" component={NotesListScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
