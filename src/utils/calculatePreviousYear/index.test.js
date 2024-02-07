import calculatePreviousYear from './index';

describe('calculatePreviousYear', () => {
  it('should return same year if current month isn\'t January', () => {
    const currentYear = 2022;
    const previousYear = calculatePreviousYear(2, currentYear);
    expect(previousYear).toBe(2022);
  });

  it('should return previous year if current month is January', () => {
    const currentYear = 2000;
    const previousYear = calculatePreviousYear(0, currentYear);
    expect(previousYear).toBe(1999);
  });
});
