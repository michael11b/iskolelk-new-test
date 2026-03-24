import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import multer from 'multer';
import path from 'path';
import { config } from '../config/dotenv.js';
import { generateFolderPath } from './pathGenerator.js';

config();

// console.log("file is running....")

// console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_REGION, process.env.AWS_BUCKET_NAME);

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer for S3 upload
const s3Storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: function (req, file, cb) {
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

// Function to delete file from S3
export const deleteFileFromS3 = async (fileKey) => {
  try {
    const { DeleteObjectCommand } = await import('@aws-sdk/client-s3');
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    return false;
  }
};

// Export the S3 storage configuration
export const s3Upload = s3Storage; 