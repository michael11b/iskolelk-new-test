# Cloudflare R2 Implementation Summary.

This document summarizes all the changes made to add Cloudflare R2 support to the Iskole.lk application.

## Backend Changes

### 1. New Files Created

#### `backend/src/utils/r2Config.js`
- R2 client configuration using AWS SDK
- R2 storage configuration for multer
- File deletion function for R2
- Similar structure to S3 config but with R2-specific settings

### 2. Modified Files

#### `backend/src/utils/fileUpload.js`
- Added import for R2 upload middleware
- Added `paperUploadR2` and `imageUploadR2` middleware configurations
- Maintains same file size limits and filters as S3

#### `backend/src/routes/paperRoutes.js`
- Added import for `paperUploadR2`
- Added R2 upload configuration
- Added new routes:
  - `POST /papers/r2` - Create paper with R2 storage
  - `PATCH /papers/:id/r2` - Update paper with R2 storage

#### `backend/src/controllers/paperController.js`
- Added import for `deleteFileFromR2`
- Updated file deletion logic to detect R2 URLs and use appropriate deletion method
- R2 URLs are detected by checking for 'r2.dev' or 'pub-' in the URL

## Frontend Changes

### 1. Modified Files

#### `frontend/src/actions/papers.js`
- Added `createPaperR2()` function
- Added `updatePaperR2()` function
- Both functions follow the same pattern as S3 functions

#### `frontend/src/app/admin/papers/create-paper/page.jsx`
- Added import for `createPaperR2`
- Added `storageType` state variable
- Added storage type selection dropdown
- Updated form submission to use appropriate storage method based on selection

#### `frontend/src/app/admin/papers/update-paper/[id]/page.jsx`
- Added imports for `updatePaperR2` and `updatePaperLocal`
- Added `storageType` state variable
- Added storage type selection dropdown
- Updated form submission to use appropriate storage method based on selection

## Deployment Changes

### 1. Modified Files

#### `.github/workflows/docker-build.yml`
- Added R2 environment variables to backend secret creation:
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_ENDPOINT`
  - `R2_BUCKET_NAME`

## Environment Variables Required

Add these to your backend `.env` file:

```env
# Cloudflare R2 Configuration
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
R2_BUCKET_NAME=your_r2_bucket_name
```

## GitHub Secrets Required

Add these secrets to your GitHub repository:

- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_ENDPOINT`
- `R2_BUCKET_NAME`

## New API Endpoints

- `POST /api/v1/papers/r2` - Create paper with R2 storage
- `PATCH /api/v1/papers/:id/r2` - Update paper with R2 storage

## User Interface Changes

### Admin Panel
- Added storage type dropdown in both create and update paper forms
- Options: AWS S3, Cloudflare R2, Local Server
- Default selection: AWS S3

## File Storage Options

The application now supports three storage options:

1. **Local Storage** - Files stored on the server filesystem
2. **AWS S3** - Files stored in AWS S3 bucket
3. **Cloudflare R2** - Files stored in Cloudflare R2 bucket

## Backward Compatibility

- All existing functionality remains intact
- No breaking changes to existing endpoints
- Existing S3 and local storage continue to work as before
- R2 is an additional option, not a replacement

## Benefits of This Implementation

1. **Flexibility** - Users can choose storage method per paper
2. **Cost Optimization** - Can use different storage for different use cases
3. **Migration Path** - Easy to migrate from one storage to another
4. **Redundancy** - Multiple storage options provide backup options
5. **Performance** - Can choose storage based on geographic location

## Testing Recommendations

1. Test R2 upload with different file types (PDF, images)
2. Test R2 file deletion when updating papers
3. Test storage type switching in admin panel
4. Verify R2 URLs are properly detected for deletion
5. Test with large files (up to 100MB limit)

## Security Considerations

- R2 credentials are stored as environment variables
- No hardcoded credentials in the codebase
- R2 URLs are validated before deletion operations
- Same file type restrictions apply to R2 as other storage methods 