import { usersReducer } from './index';
import { USERS_ACTIONS } from '../constants';

describe('usersReducer', () => {
  it('should handle FETCH_USERS_PENDING action', () => {
    const initialState = { isLoading: false };
    const action = { type: USERS_ACTIONS.FETCH_USERS_PENDING };
    const newState = usersReducer(initialState, action);
    expect(newState).toEqual({ isLoading: true });
  });

  it('should handle FETCH_USERS_FULFILLED action', () => {
    const initialState = { isLoading: true, records: [] };
    const payload = [{ id: 1, name: 'John' }];
    const action = { type: USERS_ACTIONS.FETCH_USERS_FULFILLED, payload };
    const newState = usersReducer(initialState, action);
    expect(newState).toEqual({ isLoading: false, records: payload });
  });

  it('should handle FETCH_USERS_REJECTED action', () => {
    const initialState = { isLoading: true, errors: [] };
    const payload = 'Error message';
    const action = { type: USERS_ACTIONS.FETCH_USERS_REJECTED, payload };
    const newState = usersReducer(initialState, action);
    expect(newState).toEqual({ isLoading: false, errors: [payload] });
  });

  it('should handle ASSIGN_REWARD_POINTS_FOR_USER_ERROR action', () => {
    const initialState = { isLoading: false, errors: [] };
    const payload = 'Error message';
    const action = { type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER_ERROR, payload };
    const newState = usersReducer(initialState, action);
    expect(newState).toEqual({ isLoading: false, errors: [payload] });
  });

  it('should handle ASSIGN_REWARD_POINTS_FOR_ALL_USERS_ERROR action', () => {
    const initialState = { isLoading: false, errors: [] };
    const payload = 'Error message';
    const action = { type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_ALL_USERS_ERROR, payload };
    const newState = usersReducer(initialState, action);
    expect(newState).toEqual({ isLoading: false, errors: [payload] });
  });

  it('should handle ASSIGN_REWARD_POINTS_FOR_USER action', () => {
    const initialState = { records: [{ id: 1, totalRewardPoints: 0 }] };
    const payload = { userId: 1, reward: 100 };
    const action = { type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER, payload };
    const newState = usersReducer(initialState, action);
    expect(newState).toEqual({ records: [{ id: 1, totalRewardPoints: 100 }] });
  });

  it('should handle CLEAR_ERROR action', () => {
    const error1 = { createdAt: 123, message: 'Error 1' };
    const error2 = { createdAt: 456, message: 'Error 2' };
    const initialState = { errors: [error1, error2] };
    const action = { type: USERS_ACTIONS.CLEAR_ERROR, payload: 123 };
    const newState = usersReducer(initialState, action);
    expect(newState).toEqual({ errors: [error2] });
  });

  it('should handle ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH action', () => {
    const initialState = { records: [{ id: 1 }] };
    const payload = { userId: 1, month: 'January', reward: 100, year: 2024 };
    const action = { type: USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH, payload };
    const newState = usersReducer(initialState, action);
    expect(newState).toEqual({ records: [{ id: 1, 'January 2024': 100 }] });
  });

  it('should return the initial state for unknown action', () => {
    const initialState = { users: [] };
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = usersReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
