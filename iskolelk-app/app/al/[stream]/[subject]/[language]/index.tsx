// app/al/[stream]/[subject]/[language]/index.tsx
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListRow } from '@/components/UI';
// import { AL_LANGUAGES, AL_STREAMS, AL_SUBJECTS_BY_STREAM } from '../../../../../lib/data';
// import { alFilters } from '../../../../../lib/dataNew';
import data from '@/assets/data/data.json';
import alFilters from '@/assets/data/alData.json';

export default function ALLanguageYearSelection() {
  const AL_STREAMS = data.AL_STREAMS;
  const AL_SUBJECTS_BY_STREAM = data.AL_SUBJECTS_BY_STREAM;
  const AL_LANGUAGES = data.AL_LANGUAGES;
  const { stream, subject, language } = useLocalSearchParams<{ stream?: string; subject?: string; language?: string }>();
  
  const s = typeof stream === 'string' ? stream : undefined;
  const sub = typeof subject === 'string' ? subject : undefined;
  const lang = typeof language === 'string' ? language : undefined;
  
  const streamMeta = AL_STREAMS.find((x) => x.key === s);
  const subjectMeta = s && sub ? AL_SUBJECTS_BY_STREAM[s as keyof typeof AL_SUBJECTS_BY_STREAM]?.find((x) => x.key === sub) : undefined;
  const languageMeta = lang ? AL_LANGUAGES.find((x) => x.key === lang) : undefined;

  // Get available years from alFilters data based on stream, subject, and language
  const getAvailableYears = () => {
    if (s && sub && lang) {
      const subjectData = alFilters.streams.find(
        item => item.stream === s && item.subject === sub
      );
      
      if (subjectData && subjectData.yearsByMedium && lang in subjectData.yearsByMedium) {
        // Use the specific years available for this language/medium
        const yearsForLanguage = subjectData.yearsByMedium[lang as keyof typeof subjectData.yearsByMedium];
        if (Array.isArray(yearsForLanguage)) {
          // Return years in descending order (newest first) as the original code did
          return yearsForLanguage.sort((a: number, b: number) => b - a);
        }
      } else if (subjectData && subjectData.years) {
        // Fallback to general years if yearsByMedium is not available
        // Check if the selected language is available for this subject
        if (subjectData.mediums && subjectData.mediums.includes(lang)) {
          return subjectData.years.sort((a: number, b: number) => b - a);
        }
      }
    }
    // Return empty array if no valid data found
    return [];
  };

  const years = getAvailableYears();

  if (!streamMeta || !subjectMeta || !languageMeta) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.error}>Invalid stream, subject, or language.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Year</Text>
        
        {/* <View style={styles.infoCard}>
          <Text style={styles.label}>Stream:</Text>
          <Text style={styles.value}>{streamMeta.label}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.label}>Subject:</Text>
          <Text style={styles.value}>{subjectMeta.label}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.label}>Language:</Text>
          <Text style={styles.value}>{languageMeta.label}</Text>
        </View> */}
        
        <Text style={styles.subtitle}>Choose a year for past papers and study materials:</Text>
        
        <FlatList
          data={years}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <ListRow
              title={`Year ${item}`}
              onPress={() =>
                router.push(`/al/${s}/${sub}/${lang}/${item.toString()}`)
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f6f6f7' 
  },
  content: { 
    flex: 1, 
    padding: 16 
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 24, 
    textAlign: 'center',
    color: '#111'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  error: { 
    color: 'crimson',
    fontSize: 16,
  },
});
