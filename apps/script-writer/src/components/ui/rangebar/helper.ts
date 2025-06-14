// Determine Tailwind class based on percentage
export const getBackgroundColorClass = (percentage: number) => {
  if (percentage < 50) {
    return 'bg-green-500'; // Green
  } else if (percentage < 75) {
    return 'bg-yellow-500'; // Yellow
  } else {
    return 'bg-red-500'; // Red
  }
};

// Determine Tailwind class based on percentage
export const getTextColorClass = (percentage: number) => {
  if (percentage < 50) {
    return 'text-green-500'; // Green
  } else if (percentage < 75) {
    return 'text-yellow-500'; // Yellow
  } else {
    return 'text-red-500'; // Red
  }
};

// Calculate the percentage
export const calculatePercentage = (currentPage: number, pagetarget: number) => {
  const filePercentage = Math.round(
    parseFloat(((currentPage / pagetarget) * 100).toFixed(0)),
  );

  return filePercentage;
};
