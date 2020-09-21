import { combineReducers } from 'redux';

import authReducer from './auth';
import historyReducer from './history';

const rootReducer = combineReducers({
  auth: authReducer,
  history:historyReducer
});

export default rootReducer;
