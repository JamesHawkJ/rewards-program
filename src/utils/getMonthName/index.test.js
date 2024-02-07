import getMonthName from './index';

describe('getMonthName', () => {
  it('should return the correct month name for a given month number', () => {
    expect(getMonthName(0)).toBe('January');
    expect(getMonthName(1)).toBe('February');
  });

  it('should return undefined for an invalid month number', () => {
    expect(getMonthName(-1)).toBeUndefined();
    expect(getMonthName(12)).toBeUndefined();
  });
});
