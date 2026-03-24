// app/scholarship/[language]/[year]/index.tsx
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { FavoriteButton } from '@/components/FavoriteButton';
import { useScholarshipPapers } from '@/hooks/usePapers';
// import { SCHOLARSHIP_LANGUAGES } from '../../../../lib/data';
import data from '@/assets/data/data.json';
import { getAccessibleFileUrl } from '@/utils/fileUrlHandler';

export default function ScholarshipFinalScreen() {
  const SCHOLARSHIP_LANGUAGES = data.SCHOLARSHIP_LANGUAGES;
  const { language, year } = useLocalSearchParams<{ language?: string; year?: string }>();
  
  const lang = typeof language === 'string' ? language : undefined;
  const y = typeof year === 'string' ? year : undefined;
  
  const languageMeta = lang ? SCHOLARSHIP_LANGUAGES.find((x) => x.key === lang) : undefined;

  // State for PDF viewer
  const [pdfViewerVisible, setPdfViewerVisible] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');
  const [currentPdfTitle, setCurrentPdfTitle] = useState('');

  // Fetch papers data
  const { papers, loading, error } = useScholarshipPapers(lang, y);
  const papersArray = papers as any[];

  // Debug logging
  console.log('ScholarshipFinalScreen - papers:', papers);
  console.log('ScholarshipFinalScreen - loading:', loading);
  console.log('ScholarshipFinalScreen - error:', error);
  console.log('ScholarshipFinalScreen - papers length:', papers?.length);

  if (!languageMeta || !y) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.error}>Invalid language or year.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Function to open PDF in app
  const openPdfInApp = (url: string, title: string) => {
    const accessibleUrl = getAccessibleFileUrl(url);
    console.log('Opening PDF in app:', accessibleUrl);
    setCurrentPdfUrl(accessibleUrl);
    setCurrentPdfTitle(title);
    setPdfViewerVisible(true);
  };

  // Function to close PDF viewer
  const closePdfViewer = () => {
    // Show confirmation dialog with download option
    Alert.alert(
      'Close PDF Viewer',
      'Would you like to download this PDF before closing?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: '💾 Download', 
          onPress: () => {
            // Download the PDF and then close
            downloadPdf(currentPdfUrl, currentPdfTitle);
            setPdfViewerVisible(false);
            setCurrentPdfUrl('');
            setCurrentPdfTitle('');
          }
        },
        { 
          text: '✕ Close', 
          onPress: () => {
            setPdfViewerVisible(false);
            setCurrentPdfUrl('');
            setCurrentPdfTitle('');
          }
        }
      ]
    );
  };

  // Function to open PDF in external app
  const openPdfExternal = async (url: string, title: string) => {
    try {
      const accessibleUrl = getAccessibleFileUrl(url);
      console.log('Opening PDF externally:', accessibleUrl);
      
      const supported = await Linking.canOpenURL(accessibleUrl);
      
      if (supported) {
        await Linking.openURL(accessibleUrl);
      } else {
        // If direct opening fails, try to open in browser
        const browserUrl = accessibleUrl.startsWith('http') ? accessibleUrl : `https://${accessibleUrl}`;
        await Linking.openURL(browserUrl);
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
      Alert.alert(
        'Error',
        'Unable to open PDF. Please check your internet connection and try again.',
        [{ text: 'OK', onPress: () => {} }]
      );
    }
  };

  // Function to download PDF (opens in browser for download)
  const downloadPdf = async (url: string, title: string) => {
    try {
      const accessibleUrl = getAccessibleFileUrl(url);
      console.log('Downloading PDF:', accessibleUrl);
      await Linking.openURL(accessibleUrl);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      Alert.alert('Error', 'Unable to download PDF. Please try opening the link instead.');
    }
  };

  // Create HTML content for PDF embedding
  const createPdfHtml = (pdfUrl: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f0f0f0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .pdf-container {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .pdf-viewer {
          width: 100%;
          height: 100%;
          border: none;
        }
        .loading {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #666;
          text-align: center;
        }
        .loading h2 {
          margin-bottom: 16px;
          color: #333;
        }
        .loading p {
          margin: 8px 0;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="pdf-container">
        <iframe 
          class="pdf-viewer"
          src="https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}#toolbar=1&navpanes=1&scrollbar=1&view=FitH"
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <div class="loading">
            <h2>📄 Loading PDF...</h2>
            <p>Please wait while the document loads.</p>
            <p>If the PDF doesn't load automatically, you can try opening it in an external app.</p>
          </div>
        </iframe>
      </div>
    </body>
    </html>
  `;

  const renderPaperItem = ({ item }: { item: any }) => {
    const hasPaper = item.fileUrl;
    const hasMarkingScheme = item.markingScheme && item.markingScheme.fileUrl;
    
    return (
      <View style={styles.paperCard}>
        {/* <Text style={styles.paperTitle}>Scholarship Paper - {item.subject} {item.year}</Text>
        <Text style={styles.paperInfo}>Medium: {item.medium}</Text> */}


        
        <View style={styles.buttonContainer}>
          {hasPaper && (
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => openPdfInApp(item.fileUrl, `Scholarship Paper - ${item.subject} ${item.year}`)}
            >
              <Text style={styles.primaryButtonText}>📄 View Paper</Text>
              <Text style={styles.buttonSubtext}>View in app</Text>
            </TouchableOpacity>
          )}
          
          {hasMarkingScheme && (
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => openPdfInApp(item.markingScheme.fileUrl, `Marking Scheme - ${item.subject} ${item.year}`)}
            >
              <Text style={styles.secondaryButtonText}>📝 View Marking Scheme</Text>
              <Text style={styles.buttonSubtext}>View in app</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.downloadContainer}>
          {hasPaper && (
            <TouchableOpacity 
              style={styles.downloadButton}
              onPress={() => downloadPdf(item.fileUrl, `Scholarship Paper - ${item.subject} ${item.year}`)}
            >
              <Text style={styles.downloadButtonText}>💾 Download Paper</Text>
            </TouchableOpacity>
          )}
          
          {hasMarkingScheme && (
            <TouchableOpacity 
              style={styles.downloadButton}
              onPress={() => downloadPdf(item.markingScheme.fileUrl, `Marking Scheme - ${item.subject} ${item.year}`)}
            >
              <Text style={styles.downloadButtonText}>💾 Download Marking Scheme</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {!hasPaper && !hasMarkingScheme && (
          <Text style={styles.noFilesText}>No files available for this paper</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* <Text style={styles.title}>Scholarship Examination</Text> */}
        
        <View style={styles.infoCard}>
          <Text style={styles.label}>Exam Type:</Text>
          <Text style={styles.value}>Scholarship</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.label}>Language:</Text>
          <Text style={styles.value}>{languageMeta.label}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.label}>Year:</Text>
          <Text style={styles.value}>{y}</Text>
        </View>
        
        <View style={styles.papersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Papers</Text>
        
            {papersArray.length > 0 && papersArray[0] && (
              <FavoriteButton
                paper={{
                  examType: 'scholarship',
                  subject: papersArray[0].subject || '',
                  language: lang || '',
                  year: y || '',
                  medium: papersArray[0].medium || '',
                  title: `scholarship-${lang}-${y}`,
                  fileUrl: papersArray[0].fileUrl,
                  markingSchemeUrl: papersArray[0].markingScheme?.fileUrl,
                }}
                size="medium"
                style={styles.favoriteButton}
              />
            )}
          </View>
          
          {loading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading papers...</Text>
            </View>
          ) : error ? (
            <View style={styles.center}>
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : papersArray.length > 0 ? (
            <FlatList
              data={papers}
              renderItem={renderPaperItem}
              keyExtractor={(item, index) => item._id || index.toString()}
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 24 }}
            />
          ) : (
            <View style={styles.center}>
              <Text style={styles.noPapers}>No papers available for this selection.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* PDF Viewer Modal */}
      <Modal
        visible={pdfViewerVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={closePdfViewer}
      >
        <SafeAreaView style={styles.pdfModalContainer}>
          <View style={styles.pdfModalHeader}>
            <Text style={styles.pdfModalTitle} numberOfLines={1}>
              {currentPdfTitle}
            </Text>
            <View style={styles.pdfModalButtons}>
              <TouchableOpacity 
                style={styles.pdfModalButton}
                onPress={() => openPdfExternal(currentPdfUrl, currentPdfTitle)}
              >
                <Text style={styles.pdfModalButtonText}>📄 External</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.pdfModalCloseButton}
                onPress={closePdfViewer}
              >
                <Text style={styles.pdfModalCloseButtonText}>✕ Close</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <WebView
            source={{ html: createPdfHtml(currentPdfUrl) }}
            style={styles.pdfWebView}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            onError={() => {
              Alert.alert(
                'PDF Loading Error',
                'Unable to load PDF in the app. Would you like to open it in an external app instead?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Open Externally', onPress: () => openPdfExternal(currentPdfUrl, currentPdfTitle) }
                ]
              );
            }}
          />
        </SafeAreaView>
      </Modal>
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
    marginBottom: 24, 
    textAlign: 'center',
    color: '#111'
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
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 20,
  },
  error: { 
    color: 'crimson',
    fontSize: 16,
  },
  papersSection: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    flex: 1,
  },
  favoriteButton: {
    marginLeft: 12,
  },
  paperCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  paperTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  paperInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    minWidth: 140,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  buttonSubtext: {
    color: '#fff',
    fontSize: 10,
    opacity: 0.9,
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    minWidth: 140,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  downloadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    flexWrap: 'wrap',
    gap: 8,
  },
  downloadButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  downloadButtonText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
  },
  noFilesText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  noPapers: {
    fontSize: 16,
    color: '#666',
  },
  pdfModalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  pdfModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  pdfModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    flex: 1,
    marginRight: 16,
  },
  pdfModalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfModalButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 6,
  },
  pdfModalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  pdfModalCloseButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  pdfModalCloseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  pdfWebView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

});
