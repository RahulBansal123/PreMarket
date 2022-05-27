import { combineReducers } from 'redux';

import authReducer from './containers/auth/reducers';
import mainReducer from './containers/main/reducers';

const reducers = {
  auth: authReducer,
  main: mainReducer,
};

export default combineReducers(reducers);
