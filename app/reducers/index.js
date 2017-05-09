import { routerReducer } from 'react-native-redux-router';
import { combineReducers } from 'redux';

import user from './user';
import todos from './todos';
import questions from './questions';

export default combineReducers({ routerReducer, user, todos, questions });
