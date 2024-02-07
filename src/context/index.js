import { createContext, useContext, useReducer, useMemo } from 'react';
import { usersActions } from '../actions';
import { usersReducer } from '../reducers';
import initialState from '../state';

const UsersStateContext = createContext(initialState);
const UsersApiContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  const api = useMemo(
    () => ({
      dispatch,
      fetchUsers: usersActions.fetchUsers(dispatch),
      calculateRewardsForAllUsers: usersActions.calculateRewardsForAllUsers(dispatch),
      calculateRewardsForUserForMonth: usersActions.calculateRewardsForUserForMonth(dispatch)
    }),
    [dispatch]
  );

  return (
    <UsersStateContext.Provider value={state}>
      <UsersApiContext.Provider value={api}>
        {children}
      </UsersApiContext.Provider>
    </UsersStateContext.Provider>
  );
};

export const useUsersState = () => {
  const context = useContext(UsersStateContext);

  if (context === undefined) {
    throw new Error('useUsersState must be used within a UsersProvider');
  }
  return context;
};

export const useUsersApi = () => {
  const context = useContext(UsersApiContext);

  if (context === null || undefined) {
    throw new Error('useUsersApi must be used within a UsersProvider');
  }
  return context;
};
