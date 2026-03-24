import Paper from '../models/paperModel.js';
import { sendResponse } from '../utils/responseHandler.js';
import { deleteFile } from '../utils/fileHandler.js';
import { deleteFileFromS3 } from '../utils/s3Config.js';
import { deleteFileFromR2 } from '../utils/r2Config.js';
import path from 'path';
import fs from 'fs';

// Get all papers with optional filtering
export const getAllPapers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query based on filters
        const query = { isActive: true };
        if (req.query.examType) query.examType = req.query.examType;
        if (req.query.stream) query.stream = req.query.stream;
        if (req.query.subject) query.subject = req.query.subject;
        if (req.query.year) query.year = parseInt(req.query.year);
        if (req.query.medium) query.medium = req.query.medium;

        // Get total count for pagination
        const total = await Paper.countDocuments(query);

        // Get paginated data
        const papers = await Paper.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Custom sort by medium: sinhala first, then tamil, then english
        papers.sort((a, b) => {
            const mediumOrder = { sinhala: 1, tamil: 2, english: 3 };
            return mediumOrder[a.medium] - mediumOrder[b.medium];
        });

        res.status(200).json({
            status: 'success',
            message: 'Papers retrieved successfully - First Test CI/CD - FINALLY---!DEDICATED!',
            data: {
                data: papers,
                pagination: {
                    total,          // Total number of items
                    pages: Math.ceil(total / limit), // Total number of pages
                    page,           // Current page
                    limit          // Items per page
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get a single paper by ID
export const getPaper = async (req, res) => {
    try {
        const paper = await Paper.findById(req.params.id);
        if (!paper) {
            return sendResponse(res, 404, "error", 'Paper not found');
        }
        sendResponse(res, 200, "success", 'Paper retrieved successfully', { data: paper });
    } catch (error) {
        sendResponse(res, 500, "error", error.message);
    }
};

// Create a new paper with file upload (local or S3)
export const createPaper = async (req, res) => {
    try {
        console.log('Create Paper - req.body:', req.body);
        console.log('Create Paper - req.files:', req.files);
        
        if (!req.files || (!req.files.paper && !req.files.markingScheme)) {
            return sendResponse(res, 400, "error", 'Please provide paper and/or marking scheme files');
        }

        const paperData = {
            examType: req.body.examType,
            year: req.body.year,
            subject: req.body.subject,
            stream: req.body.stream,
            medium: req.body.medium,
            paperNumber: req.body.paperNumber,
            uploadedBy: req.user._id
        };

        // Helper function to generate the correct path and move files
        const generateCorrectPath = (file, isMarkingScheme = false) => {
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
            if (isMarkingScheme) {
                const pathParts = folderPath.split('/');
                const filenamePart = pathParts.pop();
                folderPath = pathParts.join('/') + '/markingschemes/' + filenamePart;
            }
            
            return folderPath;
        };

        // Handle paper file upload
        if (req.files.paper) {
            const paperFile = req.files.paper[0];
            
            if (paperFile.location) {
                // Cloud storage (S3/R2) - use the location directly
                paperData.fileUrl = paperFile.location;
            } else {
                // Local storage - generate the correct path and move the file
                const correctPath = generateCorrectPath(paperFile, false);
                // paperFile.path already contains the full path, so we don't need to join with 'public/uploads'
                const tempPath = paperFile.path;
                const finalPath = path.join('public/uploads', correctPath);
                
                console.log('Moving file from:', tempPath);
                console.log('Moving file to:', finalPath);
                
                // Create directory if it doesn't exist
                const finalDir = path.dirname(finalPath);
                if (!fs.existsSync(finalDir)) {
                    fs.mkdirSync(finalDir, { recursive: true });
                }
                
                // Move file from temp location to final location
                fs.renameSync(tempPath, finalPath);
                
                paperData.fileUrl = `/uploads/${correctPath}`;
            }
            paperData.fileSize = paperFile.size;
            paperData.fileType = paperFile.mimetype;
        }

        // Handle marking scheme file upload
        if (req.files.markingScheme) {
            const markingSchemeFile = req.files.markingScheme[0];
            
            if (markingSchemeFile.location) {
                // Cloud storage (S3/R2) - use the location directly
                paperData.markingScheme = {
                    fileUrl: markingSchemeFile.location,
                    fileSize: markingSchemeFile.size,
                    fileType: markingSchemeFile.mimetype,
                    uploadedAt: new Date()
                };
            } else {
                // Local storage - generate the correct path and move the file
                const correctPath = generateCorrectPath(markingSchemeFile, true);
                // markingSchemeFile.path already contains the full path, so we don't need to join with 'public/uploads'
                const tempPath = markingSchemeFile.path;
                const finalPath = path.join('public/uploads', correctPath);
                
                console.log('Moving marking scheme from:', tempPath);
                console.log('Moving marking scheme to:', finalPath);
                
                // Create directory if it doesn't exist
                const finalDir = path.dirname(finalPath);
                if (!fs.existsSync(finalDir)) {
                    fs.mkdirSync(finalDir, { recursive: true });
                }
                
                // Move file from temp location to final location
                fs.renameSync(tempPath, finalPath);
                
                paperData.markingScheme = {
                    fileUrl: `/uploads/${correctPath}`,
                    fileSize: markingSchemeFile.size,
                    fileType: markingSchemeFile.mimetype,
                    uploadedAt: new Date()
                };
            }
        }

        const paper = await Paper.create(paperData);
        sendResponse(res, 201, "success", 'Paper created successfully', { data: paper });
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, "error", error.message);
    }
};

// Update a paper with optional file updates
export const updatePaper = async (req, res) => {
    try {
        const paperId = req.params.id;
        const existingPaper = await Paper.findById(paperId);
        
        if (!existingPaper) {
            return sendResponse(res, 404, "error", 'Paper not found');
        }

        const updateData = { ...req.body };
        
        // Handle paper file update
        if (req.files?.paper) {
            const paperFile = req.files.paper[0];
            
            // Delete old file
            if (existingPaper.fileUrl) {
                if (existingPaper.fileUrl.startsWith('http')) {
                    // Check if it's R2 or S3 URL
                    if (existingPaper.fileUrl.includes('r2.dev') || existingPaper.fileUrl.includes('pub-')) {
                        await deleteFileFromR2(existingPaper.fileUrl);
                    } else {
                        await deleteFileFromS3(existingPaper.fileUrl);
                    }
                } else {
                    deleteFile(existingPaper.fileUrl);
                }
            }

            // Use the file's key/path from cloud storage or construct the path for local storage
            if (paperFile.location) {
                // Cloud storage (S3/R2) - use the location directly
                updateData.fileUrl = paperFile.location;
            } else {
                // Local storage - construct the path based on the new structure
                const { generateFolderPath } = await import('../utils/pathGenerator.js');
                const dynamicPath = generateFolderPath(req, paperFile);
                updateData.fileUrl = `/uploads/${dynamicPath}`;
            }
            updateData.fileSize = paperFile.size;
            updateData.fileType = paperFile.mimetype;
        }

        // Handle marking scheme file update
        if (req.files?.markingScheme) {
            const markingSchemeFile = req.files.markingScheme[0];
            
            // Delete old marking scheme file
            if (existingPaper.markingScheme && existingPaper.markingScheme.fileUrl) {
                if (existingPaper.markingScheme.fileUrl.startsWith('http')) {
                    // Check if it's R2 or S3 URL
                    if (existingPaper.markingScheme.fileUrl.includes('r2.dev') || existingPaper.markingScheme.fileUrl.includes('pub-')) {
                        await deleteFileFromR2(existingPaper.markingScheme.fileUrl);
                    } else {
                        await deleteFileFromS3(existingPaper.markingScheme.fileUrl);
                    }
                } else {
                    deleteFile(existingPaper.markingScheme.fileUrl);
                }
            }

            // Use the file's key/path from cloud storage or construct the path for local storage
            if (markingSchemeFile.location) {
                // Cloud storage (S3/R2) - use the location directly
                updateData.markingScheme = {
                    fileUrl: markingSchemeFile.location,
                    fileSize: markingSchemeFile.size,
                    fileType: markingSchemeFile.mimetype,
                    uploadedAt: new Date()
                };
            } else {
                // Local storage - construct the path based on the new structure
                const { generateFolderPath } = await import('../utils/pathGenerator.js');
                const dynamicPath = generateFolderPath(req, markingSchemeFile);
                updateData.markingScheme = {
                    fileUrl: `/uploads/${dynamicPath}`,
                    fileSize: markingSchemeFile.size,
                    fileType: markingSchemeFile.mimetype,
                    uploadedAt: new Date()
                };
            }
        }

        // Only update fields that have changed
        const finalUpdateData = {};
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined && updateData[key] !== existingPaper[key]) {
                finalUpdateData[key] = updateData[key];
            }
        });

        const paper = await Paper.findByIdAndUpdate(
            paperId,
            finalUpdateData,
            { new: true, runValidators: true }
        );

        sendResponse(res, 200, "success", 'Paper updated successfully', { data: paper });
    } catch (error) {
        sendResponse(res, 500, "error", error.message);
    }
};

// Delete a paper and its associated files
export const deletePaper = async (req, res) => {
    try {
        const paper = await Paper.findById(req.params.id);
        
        if (!paper) {
            return sendResponse(res, 404, "error", 'Paper not found');
        }

        // Delete paper file
        if (paper.fileUrl) {
            if (paper.fileUrl.startsWith('http')) {
                // Check if it's R2 or S3 URL
                if (paper.fileUrl.includes('r2.dev') || paper.fileUrl.includes('pub-')) {
                    await deleteFileFromR2(paper.fileUrl);
                } else {
                    await deleteFileFromS3(paper.fileUrl);
                }
            } else {
                deleteFile(paper.fileUrl);
            }
        }

        // Delete marking scheme file
        if (paper.markingScheme && paper.markingScheme.fileUrl) {
            if (paper.markingScheme.fileUrl.startsWith('http')) {
                // Check if it's R2 or S3 URL
                if (paper.markingScheme.fileUrl.includes('r2.dev') || paper.markingScheme.fileUrl.includes('pub-')) {
                    await deleteFileFromR2(paper.markingScheme.fileUrl);
                } else {
                    await deleteFileFromS3(paper.markingScheme.fileUrl);
                }
            } else {
                deleteFile(paper.markingScheme.fileUrl);
            }
        }

        await Paper.findByIdAndDelete(req.params.id);
        sendResponse(res, 200, "success", 'Paper and associated files deleted successfully');
    } catch (error) {
        sendResponse(res, 500, "error", error.message);
    }
};

// Increment download count for paper or marking scheme
export const incrementDownloadCount = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query; // 'paper' or 'markingScheme'

        const update = type === 'paper' 
            ? { $inc: { downloadCount: 1 } }
            : { $inc: { markingSchemeDownloadCount: 1 } };

        const paper = await Paper.findByIdAndUpdate(id, update, { new: true });
        
        if (!paper) {
            return sendResponse(res, 404, "error", 'Paper not found');
        }

        sendResponse(res, 200, "success", 'Download count updated successfully', { data: paper });
    } catch (error) {
        sendResponse(res, 500, "error", error.message);
    }
};
