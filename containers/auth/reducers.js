import { LOGIN_ACTION, SET_USER } from './constants';

const initialState = { user: null };

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default applicationReducer;
