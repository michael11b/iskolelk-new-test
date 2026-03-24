/**
 * Utility function to handle file URL transformations
 * Converts Cloudflare R2 URLs to public domain URLs for accessibility
 */

/**
 * Transforms file URLs to ensure they are accessible
 * @param {string} path - The file path or URL to transform
 * @returns {string} - The transformed URL that is accessible
 */
export const getAccessibleFileUrl = (path) => {
  // If the path is already a complete URL, check if it's a Cloudflare R2 URL
  if (path.startsWith('http')) {
    // Check if it's a Cloudflare R2 URL that needs transformation
    if (path.includes('.r2.cloudflarestorage.com')) {
      // Get the public domain from environment variable
      const publicDomain = process.env.NEXT_PUBLIC_FILES_PUBLIC_DOMAIN;
      if (publicDomain) {
        // Extract the path part after the bucket name
        const urlParts = path.split('.r2.cloudflarestorage.com/');
        if (urlParts.length > 1) {
          const filePath = urlParts[1];
          return `${publicDomain}/${filePath}`;
        }
      }
      // If no public domain configured, return original URL
      return path;
    }
    // If it's not a Cloudflare R2 URL, return as is
    return path;
  }
  
  // If it's a local file path, prepend the backend URL
  if (path.startsWith('/uploads/')) {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL_FILES;
    return `${backendUrl}${path}`;
  }
  
  // For any other case, return the path as is
  return path;
};

/**
 * Legacy function name for backward compatibility
 * @deprecated Use getAccessibleFileUrl instead
 */
export const getBackendUrl = getAccessibleFileUrl;
