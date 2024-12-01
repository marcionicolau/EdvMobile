import { combineReducers } from 'redux';

import { reducer as offline } from 'redux-offline-queue';
import login from './login';
import logout from './logout';
import users from './users';

import { reducer as diagnostics } from './diagnostics';

const reducers = combineReducers({
  offline,
  login,
  logout,
  users,
  diagnostics,
});

export default reducers;
