import { routerReducer } from 'react-native-redux-router';
import { combineReducers } from 'redux';

import app from './app';
import user from './user';
import users from './users';
import todos from './todos';
import questions from './questions';

export default combineReducers({ routerReducer, app, user, users, todos, questions });
