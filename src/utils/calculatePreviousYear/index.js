const calculatePreviousYear = (currentMonth, currentYear) => currentMonth < 1 ? currentYear - 1 : currentYear;

export default calculatePreviousYear;
