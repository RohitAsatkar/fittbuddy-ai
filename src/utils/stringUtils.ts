
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.replace('_', ' ').slice(1);
};

export const normalizeExerciseName = (name: string): string => {
  // Standardize format for comparison: lowercase, remove extra spaces, trim
  return name.toLowerCase().replace(/\s+/g, ' ').trim();
};

export const cleanupUserQuery = (query: string): string => {
  // Standardize format for searching: lowercase, remove extra spaces, trim
  return query.toLowerCase().replace(/\s+/g, ' ').trim();
};

// Compare two strings for exercise matching with different normalization levels
export const areExerciseNamesMatching = (name1: string, name2: string): boolean => {
  const normalized1 = normalizeExerciseName(name1);
  const normalized2 = normalizeExerciseName(name2);
  
  // Exact match
  if (normalized1 === normalized2) return true;
  
  // One contains the other (for partial matches)
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) return true;
  
  // Word-by-word partial match (for multi-word exercises)
  const words1 = normalized1.split(' ');
  const words2 = normalized2.split(' ');
  
  // If at least half the words match between the two strings
  const matchingWords = words1.filter(word => words2.includes(word)).length;
  if (matchingWords > 0 && 
      (matchingWords >= words1.length / 2 || matchingWords >= words2.length / 2)) {
    return true;
  }
  
  return false;
};
