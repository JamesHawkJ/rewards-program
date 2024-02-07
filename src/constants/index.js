export const USERS_ACTIONS = Object.freeze({
  FETCH_USERS_PENDING: 'FETCH_USERS_PENDING',
  FETCH_USERS_FULFILLED: 'FETCH_USERS_FULFILLED',
  FETCH_USERS_REJECTED: 'FETCH_USERS_REJECTED',
  ASSIGN_REWARD_POINTS_FOR_USER: 'ASSIGN_REWARD_POINTS_FOR_USER',
  ASSIGN_REWARD_POINTS_FOR_USER_ERROR: 'ASSIGN_REWARD_POINTS_FOR_USER_ERROR',
  ASSIGN_REWARD_POINTS_FOR_ALL_USERS_ERROR: 'ASSIGN_REWARD_POINTS_FOR_ALL_USERS_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH: 'ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH',
  ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR: 'ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR'
});

export const ERROR_MESSAGES = Object.freeze({
  INVALID_TRANSACTIONS: 'Transactions are corrupted for user ',
  INVALID_USERS: 'Invalid users records',
  FETCH_USERS_ERROR: 'Failed to fetch users',
  ASSIGN_REWARD_POINTS_ERROR: 'Failed to assign reward points for',
  UNKNOWN_ERROR: 'An unknown error occurred',
  INVALID_MONTH: 'Invalid month',
  INVALID_YEAR: 'Invalid year'
});
