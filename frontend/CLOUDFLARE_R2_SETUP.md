# Cloudflare R2 Integration Setup

This document explains how to configure the Cloudflare R2 integration for file access in the frontend application.

## Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
# Cloudflare R2 Public Domain for file access
# This should be the public domain that provides access to your R2 bucket files
NEXT_PUBLIC_FILES_PUBLIC_DOMAIN=https://files.iskolelk.com
```

## How It Works

The application now includes a utility function `getAccessibleFileUrl` that:

1. **Detects Cloudflare R2 URLs**: Identifies URLs containing `.r2.cloudflarestorage.com`
2. **Transforms URLs**: Converts R2 URLs to your public domain URLs
3. **Maintains Compatibility**: Still handles local file paths and other URL types

## Example Transformation

**Input (R2 URL):**
```
https://iskole-past-papers-bucket.4df56079d91bf817340786ff1cec3819.r2.cloudflarestorage.com/al/accounting/sinhala/markingscheme/2012-al-accounting-markingscheme-sinhala.pdf
```

**Output (Public Domain URL):**
```
https://files.iskolelk.com/al/accounting/sinhala/markingscheme/2012-al-accounting-markingscheme-sinhala.pdf
```

## Files Updated

The following files have been updated to use the new utility function:

- `frontend/src/app/papers/al/[stream]/[subject]/[year]/page.jsx`
- `frontend/src/app/papers/ol/[subject]/[year]/page.jsx`
- `frontend/src/app/papers/scholarship/[year]/page.jsx`

## Utility Function

The main utility function is located at:
```
frontend/src/utils/fileUrlHandler.js
```

This function exports:
- `getAccessibleFileUrl()` - Main function for URL transformation
- `getBackendUrl()` - Legacy function for backward compatibility

## Benefits

1. **Access Control**: Files are only accessible through your public domain
2. **Security**: Direct R2 bucket access is prevented
3. **Flexibility**: Easy to change the public domain without code changes
4. **Maintainability**: Centralized URL handling logic
5. **User Experience**: Buttons are automatically disabled when files are not available
6. **Visual Feedback**: Clear indication of file availability with hover tooltips
