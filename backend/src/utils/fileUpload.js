import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { s3Upload } from './s3Config.js';
import { r2Upload } from './r2Config.js';
import { generateFolderPath } from './pathGenerator.js';

// Configure multer for local file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = 'public/uploads';
    
    // Use dynamic path generation
    const dynamicPath = generateFolderPath(req, file);
    const fullPath = path.join(uploadPath, dynamicPath);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, path.dirname(fullPath));
  },
  filename: function (req, file, cb) {
    const dynamicPath = generateFolderPath(req, file);
    const filename = path.basename(dynamicPath);
    cb(null, filename);
  }
});

// File filter for papers (PDF and images)
const paperFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(pdf|PDF|jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = 'Only PDF and image files are allowed!';
    return cb(new Error('Only PDF and image files are allowed!'), false);
  }
  cb(null, true);
};

// File filter for images only
const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Local file upload middleware for papers
export const paperUpload = multer({
  storage: storage,
  fileFilter: paperFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max-limit
  }
});

// Local file upload middleware for images
export const imageUpload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max-limit
  }
});

// S3 file upload middleware for papers
export const paperUploadS3 = multer({
  storage: s3Upload,
  fileFilter: paperFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max-limit
  }
});

// S3 file upload middleware for images
export const imageUploadS3 = multer({
  storage: s3Upload,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max-limit
  }
});

// R2 file upload middleware for papers
export const paperUploadR2 = multer({
  storage: r2Upload,
  fileFilter: paperFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max-limit
  }
});

// R2 file upload middleware for images
export const imageUploadR2 = multer({
  storage: r2Upload,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max-limit
  }
}); 