/**
 * Converts a string with spaces to a URL-friendly format by replacing spaces with hyphens
 * @param {string} str - The string to convert
 * @returns {string} - URL-friendly string with hyphens instead of spaces
 */
export const toUrlFormat = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Converts a URL-friendly string back to a readable format by replacing hyphens with spaces
 * @param {string} str - The URL-friendly string to convert
 * @returns {string} - Readable string with spaces instead of hyphens
 */
export const fromUrlFormat = (str) => {
  if (!str) return '';
  return str.replace(/-/g, ' ');
};

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} - String with first letter of each word capitalized
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}; 