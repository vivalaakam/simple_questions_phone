import { routerReducer } from 'react-native-redux-router';
import { combineReducers } from 'redux';

import user from './user';
import todos from './todos';

export default  combineReducers({ routerReducer, user, todos });