import {
  validateTransactions,
  validateUsers,
  validateMonth,
  validateYear,
} from './index';

describe('validateTransactions', () => {
  it('should return true if transactions are valid', () => {
    const transactions = [];
    const isValid = validateTransactions(transactions);
    expect(isValid).toBe(true);
  });

  it('should throw if transactions are invalid', () => {
    const transactions = 'invalid';
    expect(() => validateTransactions(transactions)).toThrow();
  });
});

describe('validateUsers', () => {
  it('should return true if users are valid', () => {
    const users = [];
    const isValid = validateUsers(users);
    expect(isValid).toBe(true);
  });

  it('should throw if users are invalid', () => {
    const users = 'invalid';
    expect(() => validateUsers(users)).toThrow();
  });
});

describe('validateMonth', () => {
  it('should return true if month is valid', () => {
    const month = 1;
    const isValid = validateMonth(month);
    expect(isValid).toBe(true);
  });

  it('should throw if month is invalid', () => {
    const month = 12;
    expect(() => validateMonth(month)).toThrow();
  });
});

describe('validateYear', () => {
  it('should return true if year is valid', () => {
    const year = 2024;
    const isValid = validateYear(year);
    expect(isValid).toBe(true);
  });

  it('should throw if year is invalid', () => {
    const year = 'invalid';
    expect(() => validateYear(year)).toThrow();
  });
});
