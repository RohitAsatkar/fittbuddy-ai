
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.replace('_', ' ').slice(1);
};
