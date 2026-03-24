import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FavoritePaper, useFavorites } from '../contexts/FavoritesContext';

interface FavoriteButtonProps {
  paper: Omit<FavoritePaper, 'id' | 'addedAt'>;
  size?: 'small' | 'medium' | 'large';
  style?: any;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  paper, 
  size = 'medium',
  style 
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites, favorites } = useFavorites();
  
  const isPaperFavorite = isFavorite(paper);
  
  const handleToggleFavorite = () => {
    if (isPaperFavorite) {
      // Find the favorite to remove using the favorites array from the hook
      const favoriteToRemove = favorites.find(fav => 
        fav.examType === paper.examType &&
        fav.subject === paper.subject &&
        fav.language === paper.language &&
        fav.year === paper.year &&
        fav.medium === paper.medium
      );
      
      if (favoriteToRemove) {
        removeFromFavorites(favoriteToRemove.id);
      }
    } else {
      addToFavorites(paper);
    }
  };

  const getHeartIcon = () => {
    return isPaperFavorite ? '❤️' : '🤍';
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: 16, padding: 8 };
      case 'large':
        return { fontSize: 24, padding: 12 };
      default:
        return { fontSize: 20, padding: 10 };
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getSizeStyles(), style]}
      onPress={handleToggleFavorite}
      activeOpacity={0.7}
    >
      <Text style={[styles.icon, getSizeStyles()]}>
        {getHeartIcon()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    textAlign: 'center',
  },
});
