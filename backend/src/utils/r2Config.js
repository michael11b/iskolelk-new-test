import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import multer from 'multer';
import path from 'path';
import { config } from '../config/dotenv.js';
import { generateFolderPath } from './pathGenerator.js';

config();

const r2Client = new S3Client({
  region: 'auto', // R2 uses 'auto' as the region
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Configure multer for R2 upload
const r2Storage = multerS3({
  s3: r2Client,
  bucket: process.env.R2_BUCKET_NAME,
  metadata: function (req, file, cb) {
    console.log(req.body, 'req.body', file, 'file');
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const dynamicPath = generateFolderPath(req, file);
    cb(null, dynamicPath);
  },
  contentType: function (req, file, cb) {
    // Set the correct content type based on file extension
    let contentType = 'application/octet-stream';
    if (file.originalname.match(/\.(pdf|PDF)$/)) {
      contentType = 'application/pdf';
    } else if (file.originalname.match(/\.(jpg|JPG|jpeg|JPEG)$/)) {
      contentType = 'image/jpeg';
    } else if (file.originalname.match(/\.(png|PNG)$/)) {
      contentType = 'image/png';
    }
    cb(null, contentType);
  },
  contentDisposition: 'inline' // This will make the file open in browser instead of downloading
});

// Function to delete file from R2
export const deleteFileFromR2 = async (fileKey) => {
  try {
    const { DeleteObjectCommand } = await import('@aws-sdk/client-s3');
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
    });

    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error('Error deleting file from R2:', error);
    return false;
  }
};

// Export the R2 storage configuration
export const r2Upload = r2Storage; 