import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import alData from '@/assets/data/alData.json';
import olData from '@/assets/data/olData.json';
import scholarshipData from '@/assets/data/scholarshipData.json';
import { ALData, ALStream } from '@/types/data/aldData';
import { OLData, OLStream } from '@/types/data/olData';
import { ScholarshipData } from '@/types/data/scholarshipData';
import { getAllPapers } from '@/actions/papers';

interface SearchResult {
  _id: string;
  examType: string;
  stream?: string;
  subject?: string;
  year: number;
  medium: string;
  paperNumber?: string;
  paper?: string;
  markingScheme?: string;
  createdAt?: string;
  updatedAt?: string;
}

const HomepageSearchSection: React.FC = () => {
  const router = useRouter();
  const [searchExamType, setSearchExamType] = useState<string>('');
  const [searchStream, setSearchStream] = useState<string>('');
  const [searchSubject, setSearchSubject] = useState<string>('');
  const [searchYear, setSearchYear] = useState<string>('');
  const [searchMedium, setSearchMedium] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Get available streams for AL
  const getAvailableStreams = (): string[] => {
    const streams = [...new Set(alData.streams.map((item: ALStream) => item.stream))];
    return streams.filter(stream => stream !== '');
  };

  // Get available subjects based on exam type and stream
  const getAvailableSubjects = (): string[] => {
    if (searchExamType === 'al' && searchStream) {
      return alData.streams
        .filter((item: ALStream) => item.stream === searchStream)
        .map((item: ALStream) => item.subject);
    } else if (searchExamType === 'ol') {
      return olData.streams.map((item: OLStream) => item.subject);
    }
    return [];
  };

  // Get available years based on exam type, stream, and subject
  const getAvailableYears = (): number[] => {
    if (searchExamType === 'al' && searchStream && searchSubject) {
      const subjectData = alData.streams.find(
        (item: ALStream) => item.stream === searchStream && item.subject === searchSubject
      );
      return subjectData ? subjectData.years : [];
    } else if (searchExamType === 'ol' && searchSubject) {
      const subjectData = olData.streams.find(
        (item: OLStream) => item.subject === searchSubject
      );
      return subjectData ? subjectData.years : [];
    } else if (searchExamType === 'scholarship') {
      return scholarshipData.streams[0].years;
    }
    return [];
  };

  // Get available mediums based on exam type, stream, and subject
  const getAvailableMediums = (): string[] => {
    if (searchExamType === 'al' && searchStream && searchSubject) {
      const subjectData = alData.streams.find(
        (item: ALStream) => item.stream === searchStream && item.subject === searchSubject
      );
      return subjectData ? subjectData.mediums : [];
    } else if (searchExamType === 'ol' && searchSubject) {
      const subjectData = olData.streams.find(
        (item: OLStream) => item.subject === searchSubject
      );
      return subjectData ? subjectData.mediums : [];
    } else if (searchExamType === 'scholarship') {
      return scholarshipData.streams[0].mediums;
    }
    return [];
  };

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      setHasSearched(true);

      // Build search params
      const searchParams: any = {
        examType: searchExamType,
        year: searchYear,
        medium: searchMedium,
      };

      // Add conditional params
      if (searchExamType === 'al') {
        searchParams.stream = searchStream;
        if (searchStream) {
          searchParams.subject = searchSubject;
        }
      } else if (searchExamType === 'ol') {
        searchParams.subject = searchSubject;
      }

      // Remove empty params
      Object.keys(searchParams).forEach(key => 
        !searchParams[key] && delete searchParams[key]
      );

      const results = await getAllPapers(searchParams);
      setSearchResults(results.data?.data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to search papers');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Reset dependent fields when exam type changes
  const handleExamTypeChange = (examType: string) => {
    setSearchExamType(examType);
    setSearchStream('');
    setSearchSubject('');
    setSearchYear('');
    setSearchMedium('');
  };

  // Reset dependent fields when stream changes
  const handleStreamChange = (stream: string) => {
    setSearchStream(stream);
    setSearchSubject('');
    setSearchYear('');
    setSearchMedium('');
  };

  // Reset dependent fields when subject changes
  const handleSubjectChange = (subject: string) => {
    setSearchSubject(subject);
    setSearchYear('');
    setSearchMedium('');
  };

  const navigateToPaper = (paper: SearchResult) => {
    if (paper.examType === 'al') {
      router.push(`/al/${paper.stream}/${paper.subject}/${paper.medium}/${paper.year}`);
    } else if (paper.examType === 'ol') {
      router.push(`/ol/${paper.subject}/${paper.medium}/${paper.year}`);
    } else {
      router.push(`/scholarship/${paper.medium}/${paper.year}`);
    }
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <View style={styles.resultRow}>
      <View style={styles.resultInfo}>
        <Text style={styles.resultText}>
          {item.examType.toUpperCase()} {item.stream ? `• ${item.stream}` : ''} {item.subject ? `• ${item.subject}` : ''} • {item.year} • {item.medium}
        </Text>
        {item.paperNumber && (
          <Text style={styles.paperNumberText}>Paper {item.paperNumber}</Text>
        )}
      </View>
      <TouchableOpacity 
        style={styles.viewButton}
        onPress={() => navigateToPaper(item)}
      >
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => {
      if (hasSearched) {
        setHasSearched(false);
        setSearchResults([]);
      }
    }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            {/* Exam Type */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Exam Type *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={searchExamType}
                  onValueChange={handleExamTypeChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Exam Type" value="" />
                  <Picker.Item label="A/L Papers" value="al" />
                  <Picker.Item label="O/L Papers" value="ol" />
                  <Picker.Item label="Scholarship Papers" value="scholarship" />
                </Picker>
              </View>
            </View>

            {/* Stream - Only for AL */}
            {searchExamType === 'al' && (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Stream *</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={searchStream}
                    onValueChange={handleStreamChange}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Stream" value="" />
                    {getAvailableStreams().map((stream) => (
                      <Picker.Item key={stream} label={stream} value={stream} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            {/* Subject - For AL and O/L */}
            {(searchExamType === 'al' || searchExamType === 'ol') && (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Subject *</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={searchSubject}
                    onValueChange={handleSubjectChange}
                    style={styles.picker}
                    enabled={searchExamType === 'ol' || (searchExamType === 'al' && !!searchStream)}
                  >
                    <Picker.Item label="Select Subject" value="" />
                    {getAvailableSubjects().map((subject) => (
                      <Picker.Item key={subject} label={subject} value={subject} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            {/* Year */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Year *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={searchYear}
                  onValueChange={setSearchYear}
                  style={styles.picker}
                  enabled={!!searchExamType}
                >
                  <Picker.Item label="Select Year" value="" />
                  {getAvailableYears().map((year) => (
                    <Picker.Item key={year} label={year.toString()} value={year.toString()} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Medium */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Medium *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={searchMedium}
                  onValueChange={setSearchMedium}
                  style={styles.picker}
                  enabled={!!searchExamType}
                >
                  <Picker.Item label="Select Medium" value="" />
                  {getAvailableMediums().map((medium) => (
                    <Picker.Item key={medium} label={medium} value={medium} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity
              style={[
                styles.searchButton,
                (!searchExamType || isSearching) && styles.searchButtonDisabled
              ]}
              onPress={handleSearch}
              disabled={!searchExamType || isSearching}
            >
              {isSearching ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.searchButtonText}>Search Papers</Text>
              )}
            </TouchableOpacity>

            {/* Helper Text */}
            <Text style={styles.helperText}>
              {!searchExamType 
                ? "Select an exam type to start searching"
                : searchExamType === 'al' && !searchStream
                ? "Select a stream to see available subjects"
                : searchExamType === 'al' && searchStream && !searchSubject
                ? "Select a subject to see available years and mediums"
                : "All fields marked with * are required"}
            </Text>
          </View>

          {/* Search Results */}
          {hasSearched && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Search Results</Text>
              {isSearching ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#007AFF" />
                  <Text style={styles.loadingText}>Searching...</Text>
                </View>
              ) : searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  renderItem={renderSearchResult}
                  keyExtractor={(item) => item._id}
                  scrollEnabled={false}
                />
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No papers found matching your search criteria.</Text>
                  <Text style={styles.noResultsSubtext}>Try adjusting your search filters.</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f7',
  },
  searchContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  picker: {
    height: 50,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  searchButtonDisabled: {
    backgroundColor: '#ccc',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 20,
  },
  resultsContainer: {
    margin: 16,
    marginTop: 0,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  noResultsContainer: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  resultRow: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultInfo: {
    flex: 1,
    marginRight: 16,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  paperNumberText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomepageSearchSection;
