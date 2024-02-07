import calculatePreviousMonth from './index';

describe('calculatePreviousMonth', () => {
  it('should return the previous month', () => {
    const currentMonth = 1;
    const previousMonth = calculatePreviousMonth(currentMonth);
    expect(previousMonth).toEqual(0);
  });

  it('should handle the beginning of the year correctly', () => {
    const currentMonth = 0;
    const previousMonth = calculatePreviousMonth(currentMonth);
    expect(previousMonth).toEqual(11);
  });
});
