// app/ol/[subject]/[language]/index.tsx
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListRow } from '@/components/UI';
// import { OL_LANGUAGES, OL_SUBJECTS } from '../../../../lib/data';
import data from '@/assets/data/data.json';
// import { olFilters } from '../../../../lib/dataNew';
import olFilters from '@/assets/data/olData.json';

export default function OLLanguageYearSelection() {
  const OL_SUBJECTS = data.OL_SUBJECTS;
  const OL_LANGUAGES = data.OL_LANGUAGES;

  const { subject, language } = useLocalSearchParams<{ subject?: string; language?: string }>();
  
  const sub = typeof subject === 'string' ? subject : undefined;
  const lang = typeof language === 'string' ? language : undefined;
  
  const subjectMeta = sub ? OL_SUBJECTS.find((x) => x.key === sub) : undefined;
  const languageMeta = lang ? OL_LANGUAGES.find((x) => x.key === lang) : undefined;

  // Get available years from olFilters data based on subject and language
  const getAvailableYears = () => {
    if (sub && lang) {
      const subjectData = olFilters.streams.find(
        item => item.subject === sub
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

  if (!subjectMeta || !languageMeta) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.error}>Invalid subject or language.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Year</Text>
        
        {/* <View style={styles.infoCard}>
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
                router.push(`/ol/${sub}/${lang}/${item.toString()}`)
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
