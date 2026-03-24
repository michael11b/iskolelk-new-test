// app/al/_layout.tsx
import { Stack } from 'expo-router';

export default function ALLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerTitleAlign: 'center',
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'A/L — Streams' }} />
      <Stack.Screen name="[stream]/index" options={{ title: 'A/L — Subjects' }} />
      <Stack.Screen name="[stream]/[subject]/index" options={{ title: 'A/L — Language Selection' }} />
      <Stack.Screen name="[stream]/[subject]/[language]/index" options={{ title: 'A/L — Year Selection' }} />
      <Stack.Screen name="[stream]/[subject]/[language]/[year]/index" options={{ title: 'A/L — Final Details' }} />
    </Stack>
  );
}