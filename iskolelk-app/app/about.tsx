import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image 
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>About Iskolelk</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Iskolelk is your comprehensive resource for accessing past examination papers 
            to help you excel in your studies. We provide a wide range of past papers for 
            A/L, O/L, and Scholarship examinations.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.sectionText}>
              To provide students with easy access to high-quality past examination papers, 
              helping them prepare effectively and achieve academic success.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What We Offer</Text>
            <Text style={styles.sectionText}>
              • A/L Examination Papers{'\n'}
              • O/L Examination Papers{'\n'}
              • Scholarship Papers{'\n'}
              • Multiple Languages{'\n'}
              • Various Years{'\n'}
              • Easy Download Access
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <Text style={styles.sectionText}>
              For support or inquiries, please visit our website or contact us through the provided channels.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Version</Text>
            <Text style={styles.sectionText}>
              Iskolelk Mobile App v1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f7',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
});
