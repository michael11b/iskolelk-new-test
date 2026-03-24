import http from '@/utils/https';

// Get all papers with optional filtering
export const getAllPapers = async (filters = {}) => {
  try {
    console.log('Fetching papers with filters:', filters);
    const response = await http.get('/papers', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching papers:', error);
    throw error.response?.data || error;
  }
};

// Get a single paper by ID
export const getPaper = async (id) => {
  try {
    const response = await http.get(`/papers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching paper:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch paper');
  }
};

// Get papers by exam type (AL, OL, Scholarship)
export const getPapersByExamType = async (examType, filters = {}) => {
  try {
    const params = { examType, ...filters };
    console.log('Fetching papers by exam type:', params);
    const response = await http.get('/papers', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching papers by exam type:', error);
    throw error.response?.data || error;
  }
};

// Get AL papers by stream, subject, language, and year
export const getALPapers = async (stream, subject, language, year) => {
  try {
    const params = {
      examType: 'al',
      stream,
      subject,
      medium: language,
      year,
      limit: 200
    };
    console.log('Fetching AL papers:', params);
    const response = await http.get('/papers', { params });
    console.log('AL papers response:', response.data);
    // Extract the papers array from the deeply nested data structure
    // response.data.data.data contains the actual papers array
    return response.data.data?.data || [];
  } catch (error) {
    console.error('Error fetching AL papers:', error);
    throw error.response?.data || error;
  }
};

// Get OL papers by subject, language, and year
export const getOLPapers = async (subject, language, year) => {
  try {
    const params = {
      examType: 'ol',
      subject,
      medium: language,
      year,
      limit: 200
    };
    console.log('Fetching OL papers:', params);
    const response = await http.get('/papers', { params });
    console.log('OL papers response:', response.data);
    // Extract the papers array from the deeply nested data structure
    return response.data.data?.data || [];
  } catch (error) {
    console.error('Error fetching OL papers:', error);
    throw error.response?.data || error;
  }
};

// Get Scholarship papers by language and year
export const getScholarshipPapers = async (language, year) => {
  try {
    const params = {
      examType: 'scholarship',
      medium: language,
      year,
      limit: 200
    };
    console.log('Fetching Scholarship papers:', params);
    const response = await http.get('/papers', { params });
    console.log('Scholarship papers response:', response.data);
    // Extract the papers array from the deeply nested data structure
    return response.data.data?.data || [];
  } catch (error) {
    console.error('Error fetching Scholarship papers:', error);
    throw error.response?.data || error;
  }
};

// Increment download count (read-only operation for analytics)
export const incrementDownloadCount = async (id, type) => {
  try {
    const response = await http.patch(`/papers/${id}/download`, null, {
      params: { type }
    });
    return response.data;
  } catch (error) {
    console.error('Error incrementing download count:', error);
    // Don't throw error for download count - it's not critical
    return null;
  }
};
