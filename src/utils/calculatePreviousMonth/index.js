const calculatePreviousMonth = (currentMonth) => currentMonth > 0 ? currentMonth - 1 : currentMonth === 0 ? 11 : null;

export default calculatePreviousMonth;
