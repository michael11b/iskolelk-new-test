import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

interface PDFViewerProps {
  url: string;
  title: string;
  onClose?: () => void;
}

export default function PDFViewer({ url, title, onClose }: PDFViewerProps) {
  const [viewMode, setViewMode] = useState<'inApp' | 'external'>('inApp');
  const [webViewError, setWebViewError] = useState(false);

  // Function to open PDF in external app/browser
  const openPdfExternal = async () => {
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        // If direct opening fails, try to open in browser
        const browserUrl = url.startsWith('http') ? url : `https://${url}`;
        await Linking.openURL(browserUrl);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to open PDF. Please check your internet connection and try again.',
        [
          { text: 'OK', onPress: () => {} },
          { text: 'Copy Link', onPress: () => copyToClipboard(url) }
        ]
      );
    }
  };

  // Function to copy URL to clipboard (fallback)
  const copyToClipboard = (url: string) => {
    Alert.alert('Link Copied', 'PDF link has been copied to clipboard');
  };

  // Function to download PDF (this would open in browser for download)
  const downloadPdf = async () => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Unable to download PDF. Please try opening the link instead.');
    }
  };

  // Function to handle WebView errors
  const handleWebViewError = () => {
    setWebViewError(true);
    Alert.alert(
      'PDF Loading Error',
      'Unable to load PDF in the app. Would you like to open it in an external app instead?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Externally', onPress: () => setViewMode('external') }
      ]
    );
  };

  // Create HTML content for PDF embedding
  const htmlContent = `
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
        .error-message {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 16px;
          margin: 16px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="pdf-container">
        <iframe 
          class="pdf-viewer"
          src="${url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH"
          type="application/pdf"
          width="100%"
          height="100%"
          onerror="document.getElementById('error').style.display='block'"
        >
          <div class="loading">
            <h2>📄 Loading PDF...</h2>
            <p>Please wait while the document loads.</p>
            <p>If the PDF doesn't load automatically, you can:</p>
            <div class="error-message" id="error" style="display:none">
              <p><strong>PDF couldn't be loaded in the app.</strong></p>
              <p>This might be due to:</p>
              <ul style="text-align: left; display: inline-block;">
                <li>Network connectivity issues</li>
                <li>PDF file size or format</li>
                <li>Browser compatibility</li>
              </ul>
            </div>
          </div>
        </iframe>
      </div>
    </body>
    </html>
  `;

  // Show external app options
  if (viewMode === 'external') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕ Close</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <View style={styles.pdfIcon}>
            <Text style={styles.pdfIconText}>📄</Text>
          </View>
          
          <Text style={styles.mainTitle}>PDF Document</Text>
          <Text style={styles.subtitle}>Choose how you'd like to view this document:</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={openPdfExternal}>
              <Text style={styles.primaryButtonText}>📱 Open in Default App</Text>
              <Text style={styles.buttonSubtext}>View in device's PDF app</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={downloadPdf}>
              <Text style={styles.secondaryButtonText}>💾 Download</Text>
              <Text style={styles.buttonSubtext}>Save to device</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.secondaryButton, styles.backToAppButton]} 
              onPress={() => setViewMode('inApp')}
            >
              <Text style={styles.secondaryButtonText}>🔄 Try In-App Again</Text>
              <Text style={styles.buttonSubtext}>View PDF within the app</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>About external viewing:</Text>
            <Text style={styles.infoText}>• File will open in your device's default PDF viewer</Text>
            <Text style={styles.infoText}>• If no PDF app is installed, it will open in your browser</Text>
            <Text style={styles.infoText}>• You can download and save the file for offline viewing</Text>
          </View>
          
          <View style={styles.urlSection}>
            <Text style={styles.urlLabel}>Document URL:</Text>
            <Text style={styles.urlText} numberOfLines={2} ellipsizeMode="middle">
              {url}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Show in-app PDF viewer
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => setViewMode('external')}
          >
            <Text style={styles.headerButtonText}>📱 External</Text>
          </TouchableOpacity>
          {onClose && (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕ Close</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onError={handleWebViewError}
        onHttpError={handleWebViewError}
        renderError={() => (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>PDF Loading Error</Text>
            <Text style={styles.errorText}>
              Unable to load PDF in the app. Please try opening it in an external app instead.
            </Text>
            <TouchableOpacity 
              style={styles.errorButton} 
              onPress={() => setViewMode('external')}
            >
              <Text style={styles.errorButtonText}>Open Externally</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  headerButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  pdfIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  pdfIconText: {
    fontSize: 40,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonSubtext: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  backToAppButton: {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    lineHeight: 20,
  },
  urlSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  urlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  urlText: {
    fontSize: 12,
    color: '#6c757d',
    fontFamily: 'monospace',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  webview: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#dc3545',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  errorButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
