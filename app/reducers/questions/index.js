import { combineReducers } from 'redux';

import list from './list';
import question from './question';

export default combineReducers({ list, question });
