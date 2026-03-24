# Environment Variables Setup

This document explains how to configure the environment variables for the Exam Prep App.

## Required Environment Variables

### 1. API Base URL
```bash
EXPO_PUBLIC_API_BASE_URL=http://127.0.0.1:3002/api/v1
```
- **Purpose**: Base URL for the backend API
- **Default**: `http://127.0.0.1:3002/api/v1` (local development)
- **Production**: Set to your actual API endpoint

### 2. Files Public Domain
```bash
EXPO_PUBLIC_FILES_PUBLIC_DOMAIN=https://files.yourdomain.com
```
- **Purpose**: Custom subdomain that points to your Cloudflare R2 storage
- **Required**: Yes, for PDF files to be accessible
- **Format**: Must be a valid HTTPS URL

## How to Set Environment Variables

### Option 1: Create a `.env` file (Recommended)
Create a `.env` file in your project root:
```bash
# .env
EXPO_PUBLIC_API_BASE_URL=http://127.0.0.1:3002/api/v1
EXPO_PUBLIC_FILES_PUBLIC_DOMAIN=https://files.yourdomain.com
```

### Option 2: Set in your shell
```bash
export EXPO_PUBLIC_API_BASE_URL="http://127.0.0.1:3002/api/v1"
export EXPO_PUBLIC_FILES_PUBLIC_DOMAIN="https://files.yourdomain.com"
```

### Option 3: Set in app.config.js
Update the `app.config.js` file with your values:
```javascript
extra: {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "http://127.0.0.1:3002/api/v1",
  filesPublicDomain: process.env.EXPO_PUBLIC_FILES_PUBLIC_DOMAIN || "https://files.yourdomain.com",
}
```

## Cloudflare R2 Setup

### 1. Create Custom Subdomain
- Create a CNAME record pointing to your R2 bucket
- Example: `files.yourdomain.com` → `your-bucket.your-account.r2.cloudflarestorage.com`

### 2. Configure R2 Bucket
- Ensure your R2 bucket has public access enabled
- Set appropriate CORS policies if needed

### 3. Update Environment Variable
```bash
EXPO_PUBLIC_FILES_PUBLIC_DOMAIN=https://files.yourdomain.com
```

## URL Transformation Examples

### Before (Cloudflare R2 URL):
```
https://iskole-past-papers-bucket.4df56079d91bf817340786ff1cec3819.r2.cloudflarestorage.com/al/agriculture/sinhala/2023-al-agriculture-sinhala.pdf
```

### After (Custom Domain):
```
https://files.yourdomain.com/al/agriculture/sinhala/2023-al-agriculture-sinhala.pdf
```

## Testing

1. **Set your environment variables**
2. **Restart the Expo development server**
3. **Navigate to a paper** (e.g., A/L → Science → Agriculture → Sinhala → 2023)
4. **Check the console logs** to see the transformed URLs
5. **Try opening the PDF** to verify accessibility

## Troubleshooting

### PDFs not loading?
- Check if `EXPO_PUBLIC_FILES_PUBLIC_DOMAIN` is set correctly
- Verify your custom domain is working
- Check browser console for errors

### API calls failing?
- Verify `EXPO_PUBLIC_API_BASE_URL` is correct
- Check if your backend is running
- Verify network connectivity

### Environment variables not working?
- Restart the Expo development server
- Check if the `.env` file is in the project root
- Verify variable names start with `EXPO_PUBLIC_`
