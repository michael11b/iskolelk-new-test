import fs from 'fs';
import path from 'path';
import Media from '../models/mediaModel.js';

export const cleanupOrphanedFiles = async () => {
  try {
    // Get all files in the uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'media');
    const files = fs.readdirSync(uploadsDir);

    // Get all media records from database
    const mediaRecords = await Media.find({}, 'image.url');
    const databaseFiles = mediaRecords.map(record => {
      if (record.image && record.image.url) {
        return path.basename(record.image.url);
      }
      return null;
    }).filter(Boolean);

    // Find and delete orphaned files
    let deletedCount = 0;
    for (const file of files) {
      if (!databaseFiles.includes(file)) {
        const filePath = path.join(uploadsDir, file);
        fs.unlinkSync(filePath);
        deletedCount++;
        console.log(`Deleted orphaned file: ${file}`);
      }
    }

    console.log(`Cleanup completed. Deleted ${deletedCount} orphaned files.`);
  } catch (error) {
    console.error('Cleanup Error:', error);
  }
}; 