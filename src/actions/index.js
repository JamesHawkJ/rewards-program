import { USERS_ACTIONS, ERROR_MESSAGES } from '../constants';
import API from '../api';
import { calculateRewardPointsForTransaction, getMonthName, setError } from '../utils';
import { validateTransactions, validateUsers, validateMonth, validateYear } from '../validators';

const fetchUsers = usersDispatch => async (shouldResolve = true) => {
  usersDispatch({
    type: USERS_ACTIONS.FETCH_USERS_PENDING
  });
  try {
    const users = await API.get(shouldResolve);
    usersDispatch({
      type: USERS_ACTIONS.FETCH_USERS_FULFILLED,
      payload: users
    });
  } catch (error) {
    setError(
      usersDispatch,
      USERS_ACTIONS.FETCH_USERS_REJECTED,
      new Error(ERROR_MESSAGES.FETCH_USERS_ERROR)
    );
  }
};

const calculateRewardsForUser = usersDispatch => (userId, transactions) => {
  try {
    validateTransactions(
      transactions,
      `${ERROR_MESSAGES.INVALID_TRANSACTIONS} ${userId}`
    );
    let reward = 0;
    for (let i = 0; i < transactions.length; i++) {
      reward += calculateRewardPointsForTransaction(transactions[i].amount);
    }
    usersDispatch({
      type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER,
      payload: { userId, reward }
    });
  } catch (error) {
    setError(
      usersDispatch,
      USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER_ERROR,
      error
    );
  };
};

const calculateRewardsForAllUsers = usersDispatch => (users) => {
  try {
    validateUsers(users, ERROR_MESSAGES.INVALID_USERS);

    users.forEach(user => {
      calculateRewardsForUser(usersDispatch)(user.id, user.transactions);
    });
  } catch (error) {
    setError(
      usersDispatch,
      USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_ALL_USERS_ERROR,
      error
    );
  }
};

const calculateRewardsForUserForMonth = usersDispatch => (userId, transactions, month, year) => {
  try {
    validateTransactions(
      transactions,
      `${ERROR_MESSAGES.INVALID_TRANSACTIONS} ${userId}`
    );
    validateMonth(
      month,
      `${ERROR_MESSAGES.INVALID_MONTH} ${month}`
    );
    validateYear(
      year,
      `${ERROR_MESSAGES.INVALID_YEAR} ${year}`
    );

    let reward = 0;
    for (let i = 0; i < transactions.length; i++) {
      const transactionDate = new Date(transactions[i].date);
      if (transactionDate.getMonth() === month && transactionDate.getFullYear() === year) {
        reward += calculateRewardPointsForTransaction(transactions[i].amount);
      };
    }

    usersDispatch({
      type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH,
      payload: { userId, reward, month: getMonthName(month), year }
    });
  } catch (error) {
    setError(
      usersDispatch,
      USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR,
      error
    );
  }
};

export const usersActions = {
  fetchUsers,
  calculateRewardsForUser,
  calculateRewardsForAllUsers,
  calculateRewardsForUserForMonth
};
