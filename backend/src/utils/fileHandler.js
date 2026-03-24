import fs from 'fs';
import path from 'path';

export const deleteFile = (filePath) => {
  try {
    // Get the absolute path by joining the current directory with the file path
    const absolutePath = path.join(process.cwd(), 'public', filePath);
    
    // Check if file exists before attempting to delete
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`File deleted successfully: ${absolutePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}; 