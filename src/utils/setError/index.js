import { USERS_ACTIONS } from '../../constants';

const setError = (dispatch, type, error) => {
  const createdAt = Date.now() + Math.random() * 1000000;
  dispatch({
    type,
    payload: {
      error,
      createdAt
    }
  });
  setTimeout(() => {
    dispatch({
      type: USERS_ACTIONS.CLEAR_ERROR,
      payload: createdAt
    });
  }, 3000);
};

export default setError;
