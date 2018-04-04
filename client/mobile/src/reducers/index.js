import { combineReducers } from 'redux';

import user from './auth';
import nav from './nav';

export default combineReducers({
  nav,
  user
});
