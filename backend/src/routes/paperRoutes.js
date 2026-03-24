import express from 'express';
import { paperUpload, paperUploadS3, paperUploadR2 } from '../utils/fileUpload.js';
import { protect, restrictTo } from '../controllers/authController.js';
import {
    getAllPapers,
    getPaper,
    createPaper,
    updatePaper,
    deletePaper,
    incrementDownloadCount
} from '../controllers/paperController.js';

const router = express.Router();

// File upload middleware configuration
const paperUploadConfig = paperUpload.fields([
    { name: 'paper', maxCount: 1 },
    { name: 'markingScheme', maxCount: 1 }
]);

const paperUploadS3Config = paperUploadS3.fields([
    { name: 'paper', maxCount: 1 },
    { name: 'markingScheme', maxCount: 1 }
]);

const paperUploadR2Config = paperUploadR2.fields([
    { name: 'paper', maxCount: 1 },
    { name: 'markingScheme', maxCount: 1 }
]);

// Public routes
router.get('/', getAllPapers);
router.get('/:id', getPaper);
router.patch('/:id/download', incrementDownloadCount);

// Protected routes (require authentication)
router.use(protect);

// Admin routes (require admin role)
router.use(restrictTo('ADMIN'));

// Create paper with local file storage
router.post('/local', paperUploadConfig, createPaper);

// Create paper with S3 storage
router.post('/s3', paperUploadS3Config, createPaper);

// Create paper with R2 storage
router.post('/r2', paperUploadR2Config, createPaper);

// Update paper with local file storage
router.patch('/:id/local', paperUploadConfig, updatePaper);

// Update paper with S3 storage
router.patch('/:id/s3', paperUploadS3Config, updatePaper);

// Update paper with R2 storage
router.patch('/:id/r2', paperUploadR2Config, updatePaper);

// Delete paper
router.delete('/:id', deletePaper);

export default router; 