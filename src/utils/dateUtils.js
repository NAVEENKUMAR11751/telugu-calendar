// English month names
export const engMonths = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Telugu lunar months (Approximate mapping for visual fallback if exact data is missing)
export const telMonths = [
  'Pushya - Magha', 'Magha - Phalguna', 'Phalguna - Chaitra', 
  'Chaitra - Vaisakha', 'Vaisakha - Jyeshtha', 'Jyeshtha - Ashadha',
  'Ashadha - Sravana', 'Sravana - Bhadrapada', 'Bhadrapada - Asvina',
  'Asvina - Kartika', 'Kartika - Margashira', 'Margashira - Pushya'
];

/**
 * Gets the month details either from the provided mock data or generates a fallback
 */
export const getMonthDetails = (monthNumber, year, calendarData) => {
  // Try to find exact match in mock data
  const dataMatch = calendarData?.months?.find(m => m.monthNumber === monthNumber);
  
  if (dataMatch) {
    return {
      ...dataMatch,
      isMockData: true
    };
  }
  
  // Fallback to generated names if data is missing
  return {
    monthNumber,
    name: engMonths[monthNumber - 1],
    teluguName: telMonths[monthNumber - 1],
    days: [],
    isMockData: false
  };
};
