export const convertTemp = (temp, unit) => {
  if (unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32);
  }
  return temp;
};
