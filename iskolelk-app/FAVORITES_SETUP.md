# Favorites System Setup

## Overview
The favorites system allows users to save papers they want to access quickly. It uses React Context API for state management and AsyncStorage for persistent local storage. The system is organized hierarchically to avoid clutter and provide better organization. Users can click on favorite titles to navigate directly to the corresponding exam pages. The app now features a bottom navigation bar for easy access to Home and Favorites from anywhere.

## Features
- ❤️ Heart icon in the top-right corner of each exam section
- 💾 Persistent storage using AsyncStorage (mobile equivalent of localStorage)
- 📱 Hierarchical organization: Main → Exam Type → Subject/Language → Papers
- 🔄 Real-time sync across all screens
- 🗑️ Individual and bulk removal options
- ⬅️ Back navigation at each level
- 🚀 **Direct Navigation**: Click on favorite titles to go to exam pages
- 🏠 **Bottom Navigation**: Easy access to Home and Favorites from anywhere

## Installation

### 1. Install Dependencies
```bash
npm install @react-native-async-storage/async-storage
```

### 2. Restart Development Server
```bash
npm start
# or
expo start
```

## How It Works

### Context API Structure
- **FavoritesContext**: Manages global favorites state
- **FavoritesProvider**: Wraps the entire app
- **useFavorites Hook**: Provides access to favorites functionality

### Navigation Structure
- **Bottom Tab Navigation**: Home and Favorites tabs always visible
- **Stack Navigation**: Exam type navigation (AL, OL, Scholarship)
- **Hierarchical Navigation**: Within favorites for organization

### Data Structure
```typescript
interface FavoritePaper {
  id: string;                    // Unique identifier
  examType: 'al' | 'ol' | 'scholarship';
  stream?: string;               // Only for AL
  subject: string;
  language: string;
  year: string;
  medium: string;
  title: string;                 // Format: examType-stream-subject-language-year
  fileUrl?: string;              // Paper URL
  markingSchemeUrl?: string;     // Marking scheme URL
  addedAt: number;               // Timestamp
}
```

### Storage
- **AsyncStorage**: Mobile equivalent of localStorage
- **Key**: `@exam_prep_favorites`
- **Format**: JSON string of FavoritePaper array
- **Persistence**: Survives app restarts

## Navigation Structure

### **NEW: Bottom Tab Navigation**
- **🏠 Home Tab**: Main exam selection screen
- **❤️ Favorites Tab**: Quick access to saved papers
- **Always Visible**: Accessible from anywhere in the app

### 1. Main Favorites Screen
- Shows only exam types that have favorites
- **A/L Examination** → Navigate to AL favorites
- **O/L Examination** → Navigate to OL favorites  
- **Scholarship** → Navigate to Scholarship favorites

### 2. AL/OL Favorites Screen
- Shows only subjects that have favorites
- Each subject shows paper count
- Navigate to individual subject favorites

### 3. Scholarship Favorites Screen
- Shows only languages that have favorites
- Each language shows paper count
- Navigate to individual language favorites

### 4. Individual Favorites Screen
- Shows actual papers with **clickable titles**
- **AL format**: `al-stream-subject-language-year`
- **OL format**: `ol-subject-language-year`
- **Scholarship format**: `scholarship-language-year`
- **Click Title** → Navigate to exam page with all papers and marking schemes

## Usage

### **NEW: Bottom Navigation**
- **Home Tab**: Access main exam selection from anywhere
- **Favorites Tab**: Quick access to saved papers from anywhere
- **Seamless Switching**: No need to navigate back to home

### Adding to Favorites
1. Navigate to any exam section (AL, OL, or Scholarship)
2. Look for the heart icon (🤍) in the top-right corner of the "Available Papers" section
3. Tap the heart to add to favorites
4. The heart will turn red (❤️) to indicate it's saved

### Viewing Favorites
1. **From anywhere in the app**: Tap the ❤️ Favorites tab
2. **Main Screen**: Choose exam type (AL, OL, or Scholarship)
3. **Exam Type Screen**: Choose subject (for AL/OL) or language (for Scholarship)
4. **Subject/Language Screen**: View all papers with that selection

### **NEW: Navigating from Favorites**
- **Click on any favorite title** to navigate directly to the exam page
- **AL Papers**: Navigate to `/al/stream/subject/language/year`
- **OL Papers**: Navigate to `/ol/subject/language/year`
- **Scholarship Papers**: Navigate to `/scholarship/language/year`
- View all papers and marking schemes in the familiar exam interface

### Managing Favorites
- **Remove Individual**: Tap the trash icon (🗑️) on any favorite
- **Remove from Section**: Tap the heart icon again to remove
- **Clear All**: Use the "Clear All" button in the main Favorites screen
- **Navigate Back**: Use the "← Back" button at each level

## Implementation Details

### Components
- **FavoriteButton**: Reusable heart button component
- **FavoritesScreen**: Hierarchical navigation with multiple views
- **FavoritesContext**: Context provider for state management

### **NEW: Navigation Configuration**
```typescript
// app/_layout.tsx
<Tabs 
  screenOptions={{ 
    headerTitleAlign: 'center',
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#8E8E93',
    tabBarStyle: {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#E5E5EA',
      paddingBottom: 5,
      paddingTop: 5,
      height: 60,
    },
  }}
>
  <Tabs.Screen 
    name="index" 
    options={{ 
      title: 'Exam Hub',
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <Text style={{ color, fontSize: size }}>🏠</Text>
      ),
    }} 
  />
  <Tabs.Screen 
    name="favorites" 
    options={{ 
      title: 'Favorites',
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ color, size }) => (
        <Text style={{ color, fontSize: size }}>❤️</Text>
      ),
    }} 
  />
  {/* Hidden tabs for exam navigation */}
  <Tabs.Screen name="al" options={{ headerShown: false, tabBarButton: () => null }} />
  <Tabs.Screen name="ol" options={{ headerShown: false, tabBarButton: () => null }} />
  <Tabs.Screen name="scholarship" options={{ headerShown: false, tabBarButton: () => null }} />
</Tabs>
```

### Screens Updated
- `app/_layout.tsx` (added bottom tab navigation)
- `app/index.tsx` (removed favorites card, improved design)
- `app/al/[stream]/[subject]/[language]/[year]/index.tsx`
- `app/ol/[subject]/[language]/[year]/index.tsx`
- `app/scholarship/[language]/[year]/index.tsx`
- `app/favorites.tsx` (hierarchical navigation with direct exam page navigation)

### Key Functions
```typescript
// Add to favorites
addToFavorites(paper: Omit<FavoritePaper, 'id' | 'addedAt'>)

// Remove from favorites
removeFromFavorites(id: string)

// Check if paper is favorite
isFavorite(paper: Omit<FavoritePaper, 'id' | 'addedAt'>)

// Clear all favorites
clearAllFavorites()

// Navigate to exam page
navigateToExamPage(favorite: FavoritePaper)
```

### Navigation States
```typescript
type NavigationState = 'main' | 'al' | 'ol' | 'scholarship' | 'subject' | 'language';

interface NavigationData {
  state: NavigationState;
  examType?: 'al' | 'ol' | 'scholarship';
  subject?: string;
  language?: string;
}
```

### **Navigation Logic**
```typescript
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
```

## User Experience

### Visual Feedback
- **Empty Heart (🤍)**: Paper not in favorites
- **Red Heart (❤️)**: Paper is in favorites
- **Blue Title**: Clickable favorite title with navigation hint
- **Smooth Animations**: Heart icon changes instantly
- **Loading States**: Shows loading while fetching favorites

### **NEW: Bottom Navigation Experience**
- **🏠 Home Tab**: Always accessible, clean exam selection
- **❤️ Favorites Tab**: Quick access to saved papers
- **Active Tab Highlighting**: Clear indication of current screen
- **Consistent Access**: No need to navigate back to home

### Navigation
- **Bottom Tabs**: Home and Favorites always visible
- **Hierarchical Navigation**: Easy to drill down to specific papers
- **Back Buttons**: Clear navigation at each level
- **Breadcrumb Titles**: Shows current location
- **Direct Navigation**: Click titles to go to exam pages

### Error Handling
- **Storage Errors**: Graceful fallback if AsyncStorage fails
- **Navigation Errors**: Clear error messages for navigation failures
- **Validation**: Checks for required fields before saving
- **Empty States**: Helpful messages when no favorites exist

## Benefits

### For Users
- **Organized Access**: Papers grouped by exam type, subject, and language
- **No Clutter**: Only shows categories with actual favorites
- **Quick Navigation**: Easy to find specific papers
- **Offline Reference**: Favorites persist without internet
- **Seamless Experience**: Click favorites to view full exam pages
- **Always Accessible**: Home and Favorites available from anywhere

### For Developers
- **Scalable**: Easy to add more exam types or categories
- **Maintainable**: Clean separation of concerns
- **Reusable**: Components can be used elsewhere
- **Type Safe**: Full TypeScript support
- **Navigation Integration**: Uses existing Expo Router infrastructure
- **Modern UX**: Bottom navigation follows mobile app best practices

## Future Enhancements

### Potential Features
- **Search**: Find specific papers across all categories
- **Categories**: Group favorites by additional criteria
- **Export**: Share favorites list
- **Sync**: Cloud backup of favorites
- **Tags**: Custom labels for organization
- **Sorting**: By date, subject, or exam type

### Technical Improvements
- **Performance**: Virtual scrolling for large lists
- **Caching**: Optimize storage operations
- **Analytics**: Track favorite usage patterns
- **Backup**: Automatic favorites backup

## Troubleshooting

### Common Issues
1. **Heart icon not showing**: Check if papers are loaded
2. **Favorites not saving**: Verify AsyncStorage permissions
3. **App crashes**: Check for missing dependencies
4. **State not updating**: Ensure FavoritesProvider is wrapping the app
5. **Navigation not working**: Check navigation state management
6. **Navigation to exam page fails**: Verify route parameters are correct
7. **Bottom tabs not showing**: Check Tabs configuration in _layout.tsx

### Debug Steps
1. Check console logs for errors
2. Verify AsyncStorage is installed
3. Confirm FavoritesProvider is in _layout.tsx
4. Test with a simple paper first
5. Check navigation state changes
6. Verify route parameters match expected format
7. Ensure Tabs navigation is properly configured

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Restart the development server
4. Check the implementation matches the examples above
5. Verify navigation state is working correctly
6. Ensure route parameters are properly formatted for navigation
7. Confirm bottom tab navigation is working properly
