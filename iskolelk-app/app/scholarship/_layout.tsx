// app/scholarship/_layout.tsx
import { Stack } from 'expo-router';

export default function ScholarshipLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerTitleAlign: 'center',
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Scholarship — Language Selection' }} />
      <Stack.Screen name="[language]/index" options={{ title: 'Scholarship — Year Selection' }} />
      <Stack.Screen name="[language]/[year]/index" options={{ title: 'Scholarship — Final Details' }} />
    </Stack>
  );
}