import { routerReducer } from 'react-native-redux-router';
import { combineReducers } from 'redux';

import user from './user';

export default  combineReducers({ routerReducer, user });