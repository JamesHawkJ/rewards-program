const validateTransactions = (transactions, errorMessage) => {
  if (!Array.isArray(transactions)) {
    throw new Error(errorMessage);
  }
  return true;
};

const validateUsers = (users, errorMessage) => {
  if (!Array.isArray(users)) {
    throw new Error(errorMessage);
  }
  return true;
};

const validateMonth = (month, errorMessage) => {
  if (!Number.isInteger(month) || month < 0 || month > 11) {
    throw new Error(errorMessage);
  }
  return true;
};

const validateYear = (year, errorMessage) => {
  if (!Number.isInteger(year)) {
    throw new Error(errorMessage);
  }
  return true;
};

export {
  validateTransactions,
  validateUsers,
  validateMonth,
  validateYear
};
