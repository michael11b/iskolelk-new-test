import http from '@/utils/https';

// Get all papers with optional filtering
export const getAllPapers = async (filters = {}) => {
  try {
    console.log(filters);
    const response = await http.get('/papers', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get a single paper by ID
export const getPaper = async (id) => {
  try {
    const response = await http.get(`/papers/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch paper');
  }
};

// Create a new paper (local storage)
export const createPaperLocal = async (data) => {
  try {
    const formData = new FormData();
    
    // Add form fields FIRST (this ensures req.body is available when multer processes files)
    Object.keys(data).forEach(key => {
      if (key !== 'paper' && key !== 'markingScheme') {
        formData.append(key, data[key]);
      }
    });
    
    // Add paper file if exists
    if (data.paper) {
      formData.append('paper', data.paper);
    }
    
    // Add marking scheme file if exists
    if (data.markingScheme) {
      formData.append('markingScheme', data.markingScheme);
    }

    const response = await http.post('/papers/local', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create a new paper (S3 storage)
export const createPaperS3 = async (data) => {
  try {
    const formData = new FormData();
    
    // Add form fields FIRST (this ensures req.body is available when multer processes files)
    Object.keys(data).forEach(key => {
      if (key !== 'paper' && key !== 'markingScheme') {
        formData.append(key, data[key]);
      }
    });
    
    // Add paper file if exists
    if (data.paper) {
      formData.append('paper', data.paper);
    }
    
    // Add marking scheme file if exists
    if (data.markingScheme) {
      formData.append('markingScheme', data.markingScheme);
    }

    const response = await http.post('/papers/s3', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create a new paper (R2 storage)
export const createPaperR2 = async (data) => {
  try {
    const formData = new FormData();
    
    // Add form fields FIRST (this ensures req.body is available when multer processes files)
    Object.keys(data).forEach(key => {
      if (key !== 'paper' && key !== 'markingScheme') {
        formData.append(key, data[key]);
      }
    });
    
    // Add paper file if exists
    if (data.paper) {
      formData.append('paper', data.paper);
    }
    
    // Add marking scheme file if exists
    if (data.markingScheme) {
      formData.append('markingScheme', data.markingScheme);
    }

    const response = await http.post('/papers/r2', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update paper with local storage
export const updatePaperLocal = async (id, data) => {
  try {
    const formData = new FormData();
    
    // Add basic fields
    formData.append('examType', data.examType);
    formData.append('year', data.year);
    formData.append('medium', data.medium);
    formData.append('paperNumber', data.paperNumber);
    
    // Add conditional fields
    if (data.examType === 'AL') {
      formData.append('stream', data.stream);
      formData.append('subject', data.subject);
    } else if (data.examType === 'OL') {
      formData.append('subject', data.subject);
    }
    
    // Add files only if they are selected
    if (data.paper) {
      formData.append('paper', data.paper);
    }
    if (data.markingScheme) {
      formData.append('markingScheme', data.markingScheme);
    }

    const response = await http.patch(`/papers/${id}/local`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update paper');
  }
};

// Update a paper (S3 storage)
export const updatePaperS3 = async (id, data) => {
  try {
    const formData = new FormData();
    
    // Add form fields FIRST (this ensures req.body is available when multer processes files)
    Object.keys(data).forEach(key => {
      if (key !== 'paper' && key !== 'markingScheme') {
        formData.append(key, data[key]);
      }
    });
    
    // Add paper file if exists
    if (data.paper) {
      formData.append('paper', data.paper);
    }
    
    // Add marking scheme file if exists
    if (data.markingScheme) {
      formData.append('markingScheme', data.markingScheme);
    }

    const response = await http.patch(`/papers/${id}/s3`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update a paper (R2 storage)
export const updatePaperR2 = async (id, data) => {
  try {
    const formData = new FormData();
    
    // Add form fields FIRST (this ensures req.body is available when multer processes files)
    Object.keys(data).forEach(key => {
      if (key !== 'paper' && key !== 'markingScheme') {
        formData.append(key, data[key]);
      }
    });
    
    // Add paper file if exists
    if (data.paper) {
      formData.append('paper', data.paper);
    }
    
    // Add marking scheme file if exists
    if (data.markingScheme) {
      formData.append('markingScheme', data.markingScheme);
    }

    const response = await http.patch(`/papers/${id}/r2`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete a paper
export const deletePaper = async (id) => {
  try {
    const response = await http.delete(`/papers/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Increment download count
export const incrementDownloadCount = async (id, type) => {
  try {
    const response = await http.patch(`/papers/${id}/download`, null, {
      params: { type }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
