// app/al/[stream]/index.tsx
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListRow } from '@/components/UI';
// import { AL_STREAMS, AL_SUBJECTS_BY_STREAM } from '../../../lib/data';
import data from '@/assets/data/data.json';

export default function ALStreamSubjects() {
  const AL_STREAMS = data.AL_STREAMS;
  const AL_SUBJECTS_BY_STREAM = data.AL_SUBJECTS_BY_STREAM; 
  const { stream } = useLocalSearchParams<{ stream?: string }>();
  const s = typeof stream === 'string' ? stream : undefined;
  const streamMeta = AL_STREAMS.find((x) => x.key === s);
  const subjects = (s && AL_SUBJECTS_BY_STREAM[s as keyof typeof AL_SUBJECTS_BY_STREAM]) || [];

  return (
    <SafeAreaView style={styles.container}>
      {!streamMeta ? (
        <View style={styles.center}><Text style={styles.error}>Unknown stream.</Text></View>
      ) : (
        <>
          <Text style={styles.header}>Stream: {streamMeta.label}</Text>
          <FlatList
            data={subjects}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <ListRow
                title={item.label}
                onPress={() =>
                  router.push({ pathname: '/al/[stream]/[subject]', params: { stream: s!, subject: item.key } })
                }
              />
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f6f7' },
  header: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { color: 'crimson' },
});