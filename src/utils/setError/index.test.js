import setError from './index';
import { USERS_ACTIONS } from '../../constants';

const error = new Error('Something went wrong');
const type = 'TYPE';

describe('setError', () => {
  it('should set the error message correctly and dispatch clear action after 3 sec', () => {
    jest.useFakeTimers();

    const dispatch = jest.fn();

    setError(dispatch, type, error);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type,
      payload: {
        error,
        createdAt: expect.any(Number)
      }
    });

    jest.runAllTimers();

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: USERS_ACTIONS.CLEAR_ERROR,
      payload: expect.any(Number)
    });
  });
});
