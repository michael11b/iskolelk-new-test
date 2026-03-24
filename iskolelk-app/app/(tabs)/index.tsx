// app/(tabs)/index.tsx
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomepageSearchSection from '@/components/HomepageSearchSection';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Quick Navigation Cards */}
          <View style={styles.cardsContainer}>
            {/* <Text style={styles.sectionTitle}>Quick Access</Text> */}
            <Card 
              title="A/L Examination" 
              subtitle="Choose a stream → subject → language → year →" 
              icon="🎓"
              onPress={() => router.push('/al')} 
            />
            
            <Card 
              title="O/L Examination" 
              subtitle="Choose a subject → language → year →" 
              icon="📚"
              onPress={() => router.push('/ol')} 
            />
            
            <Card 
              title="Scholarship" 
              subtitle="Choose a language → year →" 
              icon="🏆"
              onPress={() => router.push('/scholarship')} 
            />
          </View>

          {/* Search Section */}
          <View style={styles.searchSection}>
            <Text style={styles.sectionTitle}>Search Papers</Text>
            <HomepageSearchSection />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({ title, subtitle, icon, onPress }: { title: string; subtitle: string; icon: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f7',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 5,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardsContainer: {
    marginBottom: 22,
  },
  searchSection: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: 'center',
  },
  cardTextContainer: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
});