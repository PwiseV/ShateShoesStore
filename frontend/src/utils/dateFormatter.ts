/**
 * Format ISO date string to dd-mm-yyyy format
 * @param dateString - ISO date string (e.g., "2026-01-21T19:09:02.653Z")
 * @returns Formatted date string (e.g., "21-01-2026")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return dateString;
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
};
