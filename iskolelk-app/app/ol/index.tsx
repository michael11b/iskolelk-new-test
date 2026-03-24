// app/ol/index.tsx
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListRow } from '@/components/UI';
// import { OL_SUBJECTS } from '../../lib/data';
import data from '@/assets/data/data.json';

export default function OLHome() {
  const OL_SUBJECTS = data.OL_SUBJECTS;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.hint}>Pick your subject</Text>
      <FlatList
        data={OL_SUBJECTS}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <ListRow 
            title={item.label} 
            onPress={() => router.push({ pathname: '/ol/[subject]', params: { subject: item.key } })} 
          />
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