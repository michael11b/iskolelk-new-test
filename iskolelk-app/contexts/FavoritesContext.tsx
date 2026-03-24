import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface FavoritePaper {
  id: string;
  examType: 'al' | 'ol' | 'scholarship';
  stream?: string;
  subject: string;
  language: string;
  year: string;
  medium: string;
  title: string;
  fileUrl?: string;
  markingSchemeUrl?: string;
  addedAt: number;
}

interface FavoritesContextType {
  favorites: FavoritePaper[];
  addToFavorites: (paper: Omit<FavoritePaper, 'id' | 'addedAt'>) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (paper: Omit<FavoritePaper, 'id' | 'addedAt'>) => boolean;
  clearAllFavorites: () => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritePaper[]>([]);
  const [loading, setLoading] = useState(true);

  const STORAGE_KEY = '@exam_prep_favorites';

  // Load favorites from AsyncStorage on app start
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: FavoritePaper[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addToFavorites = (paper: Omit<FavoritePaper, 'id' | 'addedAt'>) => {
    const newFavorite: FavoritePaper = {
      ...paper,
      id: `${paper.examType}_${paper.subject}_${paper.language}_${paper.year}_${Date.now()}`,
      addedAt: Date.now(),
    };

    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const isFavorite = (paper: Omit<FavoritePaper, 'id' | 'addedAt'>) => {
    return favorites.some(fav => 
      fav.examType === paper.examType &&
      fav.subject === paper.subject &&
      fav.language === paper.language &&
      fav.year === paper.year &&
      fav.medium === paper.medium
    );
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    saveFavorites([]);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearAllFavorites,
    loading,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
