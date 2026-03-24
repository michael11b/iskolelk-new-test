// app/al/index.tsx
import { router, Stack } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListRow } from '@/components/UI';
// import { AL_STREAMS } from '../../lib/data';
import data from '@/assets/data/data.json';

export default function ALHome() {
  const AL_STREAMS = data.AL_STREAMS;
  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.hint}>Pick your stream</Text>
      <FlatList
        data={AL_STREAMS}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <ListRow title={item.label} onPress={() => router.push({ pathname: '/al/[stream]', params: { stream: item.key } })} />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f6f7' },
  hint: { marginBottom: 12, color: '#555' },
});