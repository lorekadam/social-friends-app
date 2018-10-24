import { combineReducers } from 'redux';

import user from './auth';
import nav from './navigation';

export default combineReducers({
  nav,
  user
});
