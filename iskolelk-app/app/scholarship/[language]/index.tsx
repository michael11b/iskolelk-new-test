// app/scholarship/[language]/index.tsx
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListRow } from '@/components/UI';
// import { SCHOLARSHIP_LANGUAGES } from '../../../lib/data';
// import { scholarshipFilters } from '../../../lib/dataNew';
import data from '@/assets/data/data.json';
import scholarshipFilters from '@/assets/data/scholarshipData.json';

export default function ScholarshipLanguageYearSelection() {
  const { language } = useLocalSearchParams<{ language?: string }>();
  const SCHOLARSHIP_LANGUAGES = data.SCHOLARSHIP_LANGUAGES;
  const lang = typeof language === 'string' ? language : undefined;
  const languageMeta = lang ? SCHOLARSHIP_LANGUAGES.find((x) => x.key === lang) : undefined;

  // Get available years from scholarshipFilters data based on language
  const getAvailableYears = () => {
    if (lang) {
      const scholarshipData = scholarshipFilters.streams.find(
        item => item.subject === "" // Scholarship doesn't have specific subjects, just general
      );
      
      if (scholarshipData && scholarshipData.yearsByMedium && lang in scholarshipData.yearsByMedium) {
        // Use the specific years available for this language/medium
        const yearsForLanguage = scholarshipData.yearsByMedium[lang as keyof typeof scholarshipData.yearsByMedium];
        if (Array.isArray(yearsForLanguage)) {
          // Return years in descending order (newest first)
          return yearsForLanguage.sort((a: number, b: number) => b - a);
        }
      } else if (scholarshipData && scholarshipData.years) {
        // Fallback to general years if yearsByMedium is not available
        // Check if the selected language is available
        if (scholarshipData.mediums && scholarshipData.mediums.includes(lang)) {
          return scholarshipData.years.sort((a: number, b: number) => b - a);
        }
      }
    }
    // Return empty array if no valid data found
    return [];
  };

  const years = getAvailableYears();

  if (!languageMeta) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.error}>Invalid language.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Year</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.label}>Language:</Text>
          <Text style={styles.value}>{languageMeta.label}</Text>
        </View>
        
        <Text style={styles.subtitle}>Choose a year for past papers and study materials:</Text>
        
        <FlatList
          data={years}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <ListRow
              title={`Year ${item}`}
              onPress={() =>
                router.push(`/scholarship/${lang}/${item.toString()}`)
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
