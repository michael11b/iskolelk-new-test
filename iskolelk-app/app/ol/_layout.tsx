// app/ol/_layout.tsx
import { Stack } from 'expo-router';

export default function OLLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerTitleAlign: 'center',
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'O/L — Subjects' }} />
      <Stack.Screen name="[subject]/index" options={{ title: 'O/L — Language Selection' }} />
      <Stack.Screen name="[subject]/[language]/index" options={{ title: 'O/L — Year Selection' }} />
      <Stack.Screen name="[subject]/[language]/[year]/index" options={{ title: 'O/L — Final Details' }} />
    </Stack>
  );
}