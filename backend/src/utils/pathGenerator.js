import path from 'path';

// Helper function to generate dynamic folder path based on exam type and parameters
export const generateFolderPath = (req, file) => {
  console.log('Path Generator Debug - req.body:', req.body);
  console.log('Path Generator Debug - file.fieldname:', file.fieldname);
  
  // Check if we have the necessary form data
  if (!req.body || !req.body.examType) {
    // Fallback to temp folder if no form data is available
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
    return `temp/${filename}`;
  }

  const { examType, subject, medium, year, paperNumber } = req.body;
  
  // Use the original filename
  const filename = file.originalname;
  
  // Generate folder path based on exam type
  let folderPath = '';
  
  if (examType === 'al') {
    // AL: examType/subject/medium/filename
    folderPath = `${examType}/${subject}/${medium}/${filename}`;
  } else if (examType === 'ol') {
    // OL: examType/subject/medium/filename
    folderPath = `${examType}/${subject}/${medium}/${filename}`;
  } else if (examType === 'scholarship') {
    // Scholarship: examType/medium/filename
    folderPath = `${examType}/${medium}/${filename}`;
  } else {
    // Unknown exam type, store in misc
    folderPath = `misc/${filename}`;
  }
  
  // For marking schemes, add markingschemes subfolder
  if (file.fieldname === 'markingScheme') {
    const pathParts = folderPath.split('/');
    const filenamePart = pathParts.pop();
    folderPath = pathParts.join('/') + '/markingschemes/' + filenamePart;
  }
  
  return folderPath;
}; 