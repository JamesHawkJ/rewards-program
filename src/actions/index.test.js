import { usersActions } from './index';
import API from '../api';
import { USERS_ACTIONS, ERROR_MESSAGES } from '../constants';
import { calculateRewardPointsForTransaction, getMonthName, setError } from '../utils';

jest.mock('../api', () => ({
  get: jest.fn()
}));

jest.mock('../utils', () => ({
  calculateRewardPointsForTransaction: jest.fn(),
  setError: jest.fn(),
  getMonthName: jest.fn()
}));

describe('usersActions', () => {
  let usersDispatch;

  beforeEach(() => {
    usersDispatch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUsers', () => {
    it(
      'should dispatch FETCH_USERS_PENDING action and call API.get with shouldResolve=true',
      async () => {
        API.get.mockResolvedValueOnce(['user1', 'user2']);

        const fetchUsers = usersActions.fetchUsers(usersDispatch);
        await fetchUsers(true);

        expect(usersDispatch).toHaveBeenCalledWith({
          type: USERS_ACTIONS.FETCH_USERS_PENDING
        });
        expect(API.get).toHaveBeenCalledWith(true);
        expect(usersDispatch).toHaveBeenCalledWith({
          type: USERS_ACTIONS.FETCH_USERS_FULFILLED,
          payload: ['user1', 'user2']
        });
      }
    );

    it(
      'should call setError with FETCH_USERS_REJECTED when API.get throws an error',
      async () => {
        const error = new Error(ERROR_MESSAGES.FETCH_USERS_ERROR);
        API.get.mockRejectedValueOnce(error);

        const fetchUsers = usersActions.fetchUsers(usersDispatch);
        await fetchUsers(true);

        expect(usersDispatch).toHaveBeenCalledTimes(1);
        expect(usersDispatch).toHaveBeenCalledWith({
          type: USERS_ACTIONS.FETCH_USERS_PENDING
        });
        expect(API.get).toHaveBeenCalledWith(true);
        expect(setError).toHaveBeenCalledWith(
          usersDispatch,
          USERS_ACTIONS.FETCH_USERS_REJECTED,
          error
        );
      }
    );
  });

  describe('calculateRewardsForUser', () => {
    it(
      'should call setError with ASSIGN_REWARD_POINTS_FOR_USER_ERROR when transactions is not an array',
      () => {
        const userId = 'user1';
        const error = new Error(`${ERROR_MESSAGES.INVALID_TRANSACTIONS} ${userId}`);

        const calculateRewardsForUser = usersActions.calculateRewardsForUser(usersDispatch);
        calculateRewardsForUser(userId, 'invalidTransactions');

        expect(usersDispatch).toHaveBeenCalledTimes(0);

        expect(setError).toHaveBeenCalledWith(
          usersDispatch,
          USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER_ERROR,
          error
        );
      }
    );

    it(
      'should calculate reward points and dispatch ASSIGN_REWARD_POINTS_FOR_USER action',
      () => {
        const userId = 'user1';
        const calculateRewardsForUser = usersActions.calculateRewardsForUser(usersDispatch);
        const transactions = [
          { amount: 51 }
        ];

        calculateRewardPointsForTransaction.mockReturnValueOnce(1);

        calculateRewardsForUser(userId, transactions);

        expect(calculateRewardPointsForTransaction).toHaveBeenCalledWith(51);
        expect(usersDispatch).toHaveBeenCalledWith({
          type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER,
          payload: {
            userId: userId,
            reward: 1
          }
        });
      }
    );
  });

  describe('calculateRewardsForAllUsers', () => {
    it(
      'should call setError with ASSIGN_REWARD_POINTS_FOR_USER_ERROR when users is not an array',
      () => {
        const error = new Error(ERROR_MESSAGES.INVALID_USERS);
        const calculateRewardsForAllUsers = usersActions.calculateRewardsForAllUsers(usersDispatch);
        calculateRewardsForAllUsers('invalidUsers');

        expect(usersDispatch).toHaveBeenCalledTimes(0);

        expect(setError).toHaveBeenCalledWith(
          usersDispatch,
          USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_ALL_USERS_ERROR,
          error
        );
      }
    );

    it(
      'should calculate reward points for each user and dispatch ASSIGN_REWARD_POINTS_FOR_USER action',
      () => {
        const calculateRewardsForAllUsers = usersActions.calculateRewardsForAllUsers(usersDispatch);
        const users = [
          {
            id: 'user1',
            transactions: [
              { amount: 51 }
            ]
          },
          {
            id: 'user2',
            transactions: [
              { amount: 52 }
            ]
          }
        ];

        calculateRewardPointsForTransaction.mockReturnValueOnce(1);
        calculateRewardPointsForTransaction.mockReturnValueOnce(2);

        calculateRewardsForAllUsers(users);

        expect(usersDispatch).toHaveBeenCalledTimes(2);
        expect(usersDispatch).toHaveBeenNthCalledWith(1, {
          type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER,
          payload: {
            userId: 'user1',
            reward: 1
          }
        });
        expect(usersDispatch).toHaveBeenLastCalledWith({
          type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER,
          payload: {
            userId: 'user2',
            reward: 2
          }
        });
      }
    );
  });

  describe('calculateRewardsForUserForMonth', () => {
    it(
      'should calculate reward points for a user and dispatch ASSIGN_REWARD_POINTS_FOR_USER action for a specific month',
      () => {
        const userId = 'user1';
        const month = 1;
        const monthName = 'February';
        const year = 2024;
        const transactions = [
          { amount: 51, date: '2024-01-01' },
          { amount: 52, date: '2024-01-01' },
          { amount: 55, date: '2024-02-01' }
        ];

        calculateRewardPointsForTransaction.mockReturnValueOnce(5);
        getMonthName.mockReturnValueOnce(monthName);

        const calculateRewardsForUserForMonth = usersActions.calculateRewardsForUserForMonth(usersDispatch);
        calculateRewardsForUserForMonth(userId, transactions, month, year);

        expect(usersDispatch).toHaveBeenCalledWith({
          type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH,
          payload: {
            userId,
            reward: 5,
            month: monthName,
            year
          }
        });
      }
    );

    it(
      'should call setError with ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR when transactions is not an array',
      () => {
        const userId = 'user1';
        const error = new Error(`${ERROR_MESSAGES.INVALID_TRANSACTIONS} ${userId}`);

        const calculateRewardsForUserForMonth = usersActions.calculateRewardsForUserForMonth(usersDispatch);
        calculateRewardsForUserForMonth(userId, 'invalidTransactions');

        expect(usersDispatch).toHaveBeenCalledTimes(0);

        expect(setError).toHaveBeenCalledWith(
          usersDispatch,
          USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR,
          error
        );
      }
    );

    it(
      'should call setError with ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR when month is invalid',
      () => {
        const userId = 'user1';
        const invalidMonth = 'invalidMonth';
        const error = new Error(`${ERROR_MESSAGES.INVALID_MONTH} ${invalidMonth}`);

        const calculateRewardsForUserForMonth = usersActions.calculateRewardsForUserForMonth(usersDispatch);
        calculateRewardsForUserForMonth(userId, [], invalidMonth, 2024);

        expect(usersDispatch).toHaveBeenCalledTimes(0);

        expect(setError).toHaveBeenCalledWith(
          usersDispatch,
          USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR,
          error
        );
      }
    );

    it(
      'should call setError with ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR when year is invalid',
      () => {
        const userId = 'user1';
        const invalidYear = 'invalidYear';
        const error = new Error(`${ERROR_MESSAGES.INVALID_YEAR} ${invalidYear}`);

        const calculateRewardsForUserForMonth = usersActions.calculateRewardsForUserForMonth(usersDispatch);
        calculateRewardsForUserForMonth(userId, [], 1, invalidYear);

        expect(usersDispatch).toHaveBeenCalledTimes(0);

        expect(setError).toHaveBeenCalledWith(
          usersDispatch,
          USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR,
          error
        );
      }
    );
  });
});
