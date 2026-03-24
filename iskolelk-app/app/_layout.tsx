import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { FavoritesProvider } from '../contexts/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <StatusBar style={Platform.select({ ios: 'dark', android: 'light' })} />
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="al" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="ol" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="scholarship" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="+not-found" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
    </FavoritesProvider>
  );
}