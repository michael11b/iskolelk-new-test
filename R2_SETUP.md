# Cloudflare R2 Setup Guide.

This guide explains how to set up Cloudflare R2 storage for the Iskole.lk application.

## Environment Variables Required

Add these environment variables to your backend `.env` file:

```env
# Cloudflare R2 Configuration
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
R2_BUCKET_NAME=your_r2_bucket_name
```

## Setting up Cloudflare R2

1. **Create a Cloudflare Account** (if you don't have one)
   - Go to [cloudflare.com](https://cloudflare.com) and sign up

2. **Enable R2 Storage**
   - In your Cloudflare dashboard, go to "R2 Object Storage"
   - Click "Get started with R2"
   - Follow the setup wizard

3. **Create an R2 Bucket**
   - Click "Create bucket"
   - Choose a unique bucket name
   - Select your preferred region

4. **Create API Tokens**
   - Go to "My Profile" > "API Tokens"
   - Click "Create Token"
   - Use the "Custom token" template
   - Add these permissions:
     - Account > Cloudflare R2 > Edit
     - Zone > Zone > Read
   - Set the account resources to "All accounts"
   - Create the token and save the credentials

5. **Get Your Account ID**
   - In your Cloudflare dashboard, look at the URL or go to "My Profile"
   - Your account ID is a 32-character hexadecimal string

## R2 Endpoint Format

Your R2 endpoint should follow this format:
```
https://your_account_id.r2.cloudflarestorage.com
```

Replace `your_account_id` with your actual Cloudflare account ID.

## Usage in the Application

The application now supports three storage options:

1. **Local Storage** - Files stored on the server
2. **AWS S3** - Files stored in AWS S3 bucket
3. **Cloudflare R2** - Files stored in Cloudflare R2 bucket

### Frontend Usage

In the admin panel, you can now select the storage type when creating or updating papers:

- **AWS S3** - Uses existing S3 configuration
- **Cloudflare R2** - Uses new R2 configuration  
- **Local Server** - Uses local file storage

### Backend Endpoints

New R2 endpoints have been added:

- `POST /api/v1/papers/r2` - Create paper with R2 storage
- `PATCH /api/v1/papers/:id/r2` - Update paper with R2 storage

## Benefits of R2

- **Cost-effective** - Often cheaper than AWS S3
- **Global CDN** - Built-in Cloudflare CDN for fast global access
- **S3-compatible API** - Easy migration from S3
- **No egress fees** - No charges for data transfer out

## Troubleshooting

1. **Authentication Errors**
   - Verify your R2 access key and secret are correct
   - Ensure your API token has the right permissions

2. **Endpoint Errors**
   - Check that your R2 endpoint URL is correct
   - Verify your account ID is accurate

3. **Bucket Access Issues**
   - Ensure your bucket name matches exactly
   - Check that your API token has access to the specific bucket

## Security Notes

- Keep your R2 credentials secure
- Use environment variables, never hardcode credentials
- Regularly rotate your API tokens
- Consider using Cloudflare's IP restrictions for additional security 