import { FavoriteButton } from '@/components/FavoriteButton';
import { FavoritePaper, useFavorites } from '@/contexts/FavoritesContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationState = 'main' | 'al' | 'ol' | 'scholarship' | 'subject' | 'language';

interface NavigationData {
  state: NavigationState;
  examType?: 'al' | 'ol' | 'scholarship';
  subject?: string;
  language?: string;
}

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites, clearAllFavorites, loading } = useFavorites();
  const [navigation, setNavigation] = React.useState<NavigationData>({ state: 'main' });
  const router = useRouter();

  // Get unique exam types from favorites
  const examTypes = React.useMemo(() => {
    const types = [...new Set(favorites.map(fav => fav.examType))];
    return types.sort();
  }, [favorites]);

  // Get unique subjects for AL from favorites
  const alSubjects = React.useMemo(() => {
    const alFavorites = favorites.filter(fav => fav.examType === 'al');
    const subjects = [...new Set(alFavorites.map(fav => fav.subject))];
    return subjects.sort();
  }, [favorites]);

  // Get unique subjects for OL from favorites
  const olSubjects = React.useMemo(() => {
    const olFavorites = favorites.filter(fav => fav.examType === 'ol');
    const subjects = [...new Set(olFavorites.map(fav => fav.subject))];
    return subjects.sort();
  }, [favorites]);

  // Get unique languages for Scholarship from favorites
  const scholarshipLanguages = React.useMemo(() => {
    const scholarshipFavorites = favorites.filter(fav => fav.examType === 'scholarship');
    const languages = [...new Set(scholarshipFavorites.map(fav => fav.language))];
    return languages.sort();
  }, [favorites]);

  // Get favorites for specific exam type, subject, and language
  const getFilteredFavorites = (examType: string, subject?: string, language?: string) => {
    return favorites.filter(fav => {
      if (fav.examType !== examType) return false;
      if (subject && fav.subject !== subject) return false;
      if (language && fav.language !== language) return false;
      return true;
    });
  };

  const handleRemoveFavorite = (favorite: FavoritePaper) => {
    Alert.alert(
      'Remove from Favorites',
      `Are you sure you want to remove "${favorite.title}" from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeFromFavorites(favorite.id) }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Favorites',
      'Are you sure you want to remove all favorites? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: clearAllFavorites }
      ]
    );
  };

  // Navigate to the corresponding exam page
  const navigateToExamPage = (favorite: FavoritePaper) => {
    try {
      if (favorite.examType === 'al') {
        // Navigate to AL page: al/stream/subject/language/year
        router.push(`/al/${favorite.stream}/${favorite.subject}/${favorite.language}/${favorite.year}`);
      } else if (favorite.examType === 'ol') {
        // Navigate to OL page: ol/subject/language/year
        router.push(`/ol/${favorite.subject}/${favorite.language}/${favorite.year}`);
      } else if (favorite.examType === 'scholarship') {
        // Navigate to Scholarship page: scholarship/language/year
        router.push(`/scholarship/${favorite.language}/${favorite.year}`);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Navigation Error', 'Unable to navigate to the exam page. Please try again.');
    }
  };

  const navigateTo = (newState: NavigationData) => {
    setNavigation(newState);
  };

  const goBack = () => {
    if (navigation.state === 'main') return;
    
    if (navigation.state === 'al' || navigation.state === 'ol' || navigation.state === 'scholarship') {
      setNavigation({ state: 'main' });
    } else if (navigation.state === 'subject') {
      setNavigation({ state: navigation.examType! });
    } else if (navigation.state === 'language') {
      setNavigation({ state: navigation.examType! });
    }
  };

  const getTitle = () => {
    switch (navigation.state) {
      case 'main': return 'Favorites';
      case 'al': return 'A/L Favorites';
      case 'ol': return 'O/L Favorites';
      case 'scholarship': return 'Scholarship Favorites';
      case 'subject': return `${navigation.examType?.toUpperCase()} ${navigation.subject} Favorites`;
      case 'language': return `Scholarship ${navigation.language} Favorites`;
      default: return 'Favorites';
    }
  };

  const renderFavoriteItem = ({ item }: { item: FavoritePaper }) => (
    <View style={styles.favoriteCard}>
      <View style={styles.favoriteHeader}>
        <View style={styles.favoriteInfo}>
          <TouchableOpacity 
            style={styles.titleContainer}
            onPress={() => navigateToExamPage(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.favoriteTitle}>{item.title}</Text>
            <Text style={styles.clickHint}>Tap to view papers →</Text>
          </TouchableOpacity>
          <Text style={styles.favoriteDetails}>
            {item.examType.toUpperCase()} • {item.subject} • {item.language} • {item.year}
          </Text>
          {item.stream && <Text style={styles.favoriteStream}>Stream: {item.stream}</Text>}
          <Text style={styles.favoriteMedium}>Medium: {item.medium}</Text>
        </View>
        <View style={styles.favoriteActions}>
          <FavoriteButton
            paper={{
              examType: item.examType,
              stream: item.stream,
              subject: item.subject,
              language: item.language,
              year: item.year,
              medium: item.medium,
              title: item.title,
              fileUrl: item.fileUrl,
              markingSchemeUrl: item.markingSchemeUrl,
            }}
            size="small"
            style={styles.favoriteHeart}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveFavorite(item)}
          >
            <Text style={styles.removeButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.addedDate}>
        Added: {new Date(item.addedAt).toLocaleDateString()}
      </Text>
    </View>
  );

  const renderMainScreen = () => (
    <View style={styles.content}>
      {examTypes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🤍</Text>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptySubtitle}>
            Papers you add to favorites will appear here for quick access.
          </Text>
          <Text style={styles.emptyHint}>
            Tap the heart icon on any paper to add it to favorites!
          </Text>
        </View>
      ) : (
        <View style={styles.categoriesContainer}>
          {examTypes.includes('al') && (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => navigateTo({ state: 'al', examType: 'al' })}
            >
              <Text style={styles.categoryIcon}>📚</Text>
              <Text style={styles.categoryTitle}>A/L Examination</Text>
              <Text style={styles.categorySubtitle}>
                {alSubjects.length} subject{alSubjects.length !== 1 ? 's' : ''} with favorites
              </Text>
            </TouchableOpacity>
          )}

          {examTypes.includes('ol') && (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => navigateTo({ state: 'ol', examType: 'ol' })}
            >
              <Text style={styles.categoryIcon}>📖</Text>
              <Text style={styles.categoryTitle}>O/L Examination</Text>
              <Text style={styles.categorySubtitle}>
                {olSubjects.length} subject{olSubjects.length !== 1 ? 's' : ''} with favorites
              </Text>
            </TouchableOpacity>
          )}

          {examTypes.includes('scholarship') && (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => navigateTo({ state: 'scholarship', examType: 'scholarship' })}
            >
              <Text style={styles.categoryIcon}>🏆</Text>
              <Text style={styles.categoryTitle}>Scholarship</Text>
              <Text style={styles.categorySubtitle}>
                {scholarshipLanguages.length} language{scholarshipLanguages.length !== 1 ? 's' : ''} with favorites
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  const renderALScreen = () => (
    <View style={styles.content}>
      <View style={styles.subjectsContainer}>
        {alSubjects.map(subject => (
          <TouchableOpacity
            key={subject}
            style={styles.subjectCard}
            onPress={() => navigateTo({ state: 'subject', examType: 'al', subject })}
          >
            <Text style={styles.subjectIcon}>📝</Text>
            <Text style={styles.subjectTitle}>{subject}</Text>
            <Text style={styles.subjectSubtitle}>
              {getFilteredFavorites('al', subject).length} paper{getFilteredFavorites('al', subject).length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderOLScreen = () => (
    <View style={styles.content}>
      <View style={styles.subjectsContainer}>
        {olSubjects.map(subject => (
          <TouchableOpacity
            key={subject}
            style={styles.subjectCard}
            onPress={() => navigateTo({ state: 'subject', examType: 'ol', subject })}
          >
            <Text style={styles.subjectIcon}>📝</Text>
            <Text style={styles.subjectTitle}>{subject}</Text>
            <Text style={styles.subjectSubtitle}>
              {getFilteredFavorites('ol', subject).length} paper{getFilteredFavorites('ol', subject).length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderScholarshipScreen = () => (
    <View style={styles.content}>
      <View style={styles.languagesContainer}>
        {scholarshipLanguages.map(language => (
          <TouchableOpacity
            key={language}
            style={styles.languageCard}
            onPress={() => navigateTo({ state: 'language', examType: 'scholarship', language })}
          >
            <Text style={styles.languageIcon}>🌍</Text>
            <Text style={styles.languageTitle}>{language}</Text>
            <Text style={styles.languageSubtitle}>
              {getFilteredFavorites('scholarship', undefined, language).length} paper{getFilteredFavorites('scholarship', undefined, language).length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPapersList = () => {
    let papers: FavoritePaper[] = [];
    
    if (navigation.state === 'subject') {
      papers = getFilteredFavorites(navigation.examType!, navigation.subject);
    } else if (navigation.state === 'language') {
      papers = getFilteredFavorites(navigation.examType!, undefined, navigation.language);
    }

    return (
      <View style={styles.content}>
        {papers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📄</Text>
            <Text style={styles.emptyTitle}>No Papers Found</Text>
            <Text style={styles.emptySubtitle}>
              No favorites found for this selection.
            </Text>
          </View>
        ) : (
          <FlatList
            data={papers}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.favoritesList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  };

  const renderContent = () => {
    switch (navigation.state) {
      case 'main':
        return renderMainScreen();
      case 'al':
        return renderALScreen();
      case 'ol':
        return renderOLScreen();
      case 'scholarship':
        return renderScholarshipScreen();
      case 'subject':
      case 'language':
        return renderPapersList();
      default:
        return renderMainScreen();
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.loadingText}>Loading favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {navigation.state !== 'main' && (
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{getTitle()}</Text>
        </View>
        {navigation.state === 'main' && favorites.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    flex: 1,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  emptyHint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  categoriesContainer: {
    gap: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  subjectsContainer: {
    gap: 12,
  },
  subjectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    flex: 1,
  },
  subjectSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  languagesContainer: {
    gap: 12,
  },
  languageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    flex: 1,
  },
  languageSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  favoritesList: {
    paddingBottom: 24,
  },
  favoriteCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  favoriteInfo: {
    flex: 1,
    marginRight: 16,
  },
  titleContainer: {
    marginBottom: 8,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  clickHint: {
    fontSize: 12,
    color: '#007AFF',
    fontStyle: 'italic',
    opacity: 0.8,
  },
  favoriteDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  favoriteStream: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  favoriteMedium: {
    fontSize: 14,
    color: '#666',
  },
  favoriteActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteHeart: {
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  removeButtonText: {
    fontSize: 16,
  },
  addedDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
