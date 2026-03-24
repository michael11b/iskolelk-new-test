// Server-side compatible version of papers actions
// This version doesn't rely on browser-specific APIs like cookies

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3002/api/v1';

// Get all papers with optional filtering (server-side compatible)
export const getAllPapersServer = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters to query string
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const url = `${API_BASE_URL}/papers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Don't cache the response to ensure fresh data
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching papers:', error);
    throw error;
  }
};

// Get a single paper by ID (server-side compatible)
export const getPaperServer = async (id) => {
  try {
    const url = `${API_BASE_URL}/papers/${id}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching paper:', error);
    throw error;
  }
};
