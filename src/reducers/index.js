import { USERS_ACTIONS } from '../constants';

export const usersReducer = (state, action) => {
  switch (action.type) {
    case USERS_ACTIONS.FETCH_USERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case USERS_ACTIONS.FETCH_USERS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        records: action.payload
      };
    case USERS_ACTIONS.FETCH_USERS_REJECTED:
    case USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER_ERROR:
    case USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_ALL_USERS_ERROR:
    case USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH_ERROR:
      if (state.errors.some(error => error.error.message === action.payload.error.message)) {
        return state;
      }
      return {
        ...state,
        isLoading: false,
        errors: [...state.errors, action.payload]
      };
    case USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER:
      return {
        ...state,
        records: state.records.map(user => {
          if (user.id === action.payload.userId) {
            return {
              ...user,
              totalRewardPoints: action.payload.reward
            };
          }
          return user;
        })
      };
    case USERS_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => error.createdAt !== action.payload)
      };
    case USERS_ACTIONS.ASSIGN_REWARD_POINTS_FOR_USER__FOR_MONTH:
      return {
        ...state,
        records: state.records.map(user => {
          if (user.id === action.payload.userId) {
            const updatedUser = { ...user };
            updatedUser[`${action.payload.month} ${action.payload.year}`] = action.payload.reward;
            return updatedUser;
          }
          return user;
        })
      };
    default:
      return state;
  }
};
