// app/scholarship/index.tsx
import { router } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListRow } from '@/components/UI';
import { useScholarshipPapersByLanguage } from '@/hooks/usePapers';
// import { SCHOLARSHIP_LANGUAGES } from '../../lib/data';
import data from '@/assets/data/data.json';

export default function ScholarshipHome() {
  const SCHOLARSHIP_LANGUAGES = data.SCHOLARSHIP_LANGUAGES;
  // Fetch available papers for all languages to show what's available
  const { papers, loading: papersLoading, error: papersError } = useScholarshipPapersByLanguage('');

  // Group papers by language and year for easier display
  const groupedPapers = papers.reduce((acc: Record<string, { language: string; year: string; papers: any[] }>, paper: any) => {
    const key = `${paper.medium}-${paper.year}`;
    if (!acc[key]) {
      acc[key] = {
        language: paper.medium,
        year: paper.year,
        papers: []
      };
    }
    acc[key].papers.push(paper);
    return acc;
  }, {});

  // Sort grouped papers by language priority: Sinhala first, then Tamil, then English
  const sortedGroupedPapers = Object.values(groupedPapers).sort((a, b) => {
    const languagePriority = { sinhala: 1, tamil: 2, english: 3 };
    const aPriority = languagePriority[a.language as keyof typeof languagePriority] || 4;
    const bPriority = languagePriority[b.language as keyof typeof languagePriority] || 4;
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    // If same language, sort by year (newest first)
    return parseInt(b.year) - parseInt(a.year);
  });

  const handlePaperGroupPress = (language: string, year: string) => {
    // Navigate directly to the final screen with pre-populated data
    router.push(`/scholarship/${language}/${year}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Scholarship Examination</Text>
        <Text style={styles.subtitle}>Choose your preferred language for study materials:</Text>
        
        <View style={styles.languageSection}>
          {SCHOLARSHIP_LANGUAGES.map((item) => (
            <ListRow 
              key={item.key}
              title={item.label} 
              onPress={() => router.push(`/scholarship/${item.key}`)} 
            />
          ))}
        </View>

        {/* Available Papers Section */}
        <View style={styles.availablePapersSection}>
          <Text style={styles.sectionTitle}>Available Papers</Text>
          <Text style={styles.sectionSubtitle}>
            Click on any available paper to go directly to the final screen:
          </Text>
          
          {papersLoading ? (
            <View style={styles.center}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.loadingText}>Loading available papers...</Text>
            </View>
          ) : papersError ? (
            <View style={styles.center}>
              <Text style={styles.errorText}>{papersError}</Text>
            </View>
          ) : sortedGroupedPapers.length > 0 ? (
            <View style={styles.papersGrid}>
              {sortedGroupedPapers.map((group: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={styles.paperGroupCard}
                  onPress={() => handlePaperGroupPress(group.language, group.year)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.paperGroupTitle}>
                    {group.year} Scholarship
                  </Text>
                  <Text style={styles.paperGroupLanguage}>
                    {group.language === 'sinhala' ? 'Sinhala' : 
                     group.language === 'tamil' ? 'Tamil' : 
                     group.language === 'english' ? 'English' : group.language}
                  </Text>
                  <Text style={styles.paperGroupCount}>
                    {group.papers.length} paper{group.papers.length > 1 ? 's' : ''} available
                  </Text>
                  <View style={styles.paperGroupArrow}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.center}>
              <Text style={styles.noPapersText}>No papers available for Scholarship yet.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f6f6f7' 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 16, 
    textAlign: 'center',
    color: '#111'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  languageSection: {
    marginBottom: 24,
  },
  // Available Papers Section Styles
  availablePapersSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  papersGrid: {
    gap: 12,
  },
  paperGroupCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    position: 'relative',
  },
  paperGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  paperGroupLanguage: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  paperGroupCount: {
    fontSize: 12,
    color: '#666',
  },
  paperGroupArrow: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  arrowText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
  },
  center: { 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  errorText: {
    color: 'crimson',
    fontSize: 14,
    textAlign: 'center',
  },
  noPapersText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
