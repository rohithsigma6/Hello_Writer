export function formatDate(isoDate: string | number | Date) {
  const date = new Date(isoDate); // Parse the ISO date string
  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get year

  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
}
