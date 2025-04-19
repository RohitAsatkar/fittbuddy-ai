
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.replace('_', ' ').slice(1);
};

export const normalizeExerciseName = (name: string): string => {
  return name.toLowerCase().trim();
};

export const cleanupUserQuery = (query: string): string => {
  return query.toLowerCase().trim();
};
