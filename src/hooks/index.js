import { useEffect } from 'react';
import { calculatePreviousMonth, calculatePreviousYear, getMonthName } from '../utils';
import { useUsersApi } from '../context';

export const useMonthlyRewards = (user) => {
  const currentDate = new Date(Date.now());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const previousMonth = calculatePreviousMonth(currentMonth);
  const previousYear = calculatePreviousYear(currentMonth, currentYear);
  const praPreviousMonth = calculatePreviousMonth(previousMonth);
  const praPreviousYear = calculatePreviousYear(previousMonth, previousYear);

  const { calculateRewardsForUserForMonth } = useUsersApi();

  useEffect(() => {
    calculateRewardsForUserForMonth(user.id, user.transactions, currentMonth, currentYear);
    calculateRewardsForUserForMonth(user.id, user.transactions, previousMonth, previousYear);
    calculateRewardsForUserForMonth(user.id, user.transactions, praPreviousMonth, praPreviousYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentMonthName: getMonthName(currentMonth),
    currentYear,
    previousMonthName: getMonthName(previousMonth),
    previousYear,
    praPreviousMonthName: getMonthName(praPreviousMonth),
    praPreviousYear
  };
};
