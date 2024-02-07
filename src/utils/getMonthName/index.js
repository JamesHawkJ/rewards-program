const getMonthName = (monthNumber) => {
  if (monthNumber < 0 || monthNumber > 11) {
    return undefined;
  }

  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
};

export default getMonthName;
