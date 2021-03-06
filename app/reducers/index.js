//import { routerReducer } from 'react-native-redux-router';
import { combineReducers } from 'redux';

import app from './app';
import user from './user';
import users from './users';
import router from './router'
import questions from './questions';
import notifications from './notifications';

export default combineReducers({ router, app, user, users, notifications, questions });
