import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';
import { call, select, put, fork, takeEvery } from 'redux-saga/effects'
import { merge } from '../helpers/ramda';

import User from '../api/user';

const userModel = new User();


const USERS_UPDATE = 'USERS_UPDATE';
const USERS_RESTORE = 'USERS_RESTORE';
const USERS_LIST = 'USERS_LIST';

const $$initialState = {};

export default function users($$state = $$initialState, { type, payload }) {
  switch (type) {
    case USERS_UPDATE:
      return merge($$state, payload);
    case USERS_RESTORE:
      return payload;
    default:
      return $$state;
  }
}

export const usersUpdate = createAction(USERS_UPDATE);

export const usersRestore = createAction(USERS_RESTORE);

export const usersList = createAction(USERS_LIST);

function getUsers(state) {
  return state.users;
}

function* usersListAction({ payload }) {
  const existsUser = yield select(getUsers);
  const usersList = payload.filter((id) => !existsUser[id]);
  const users = yield userModel.list(usersList);
  const data = users.reduce((state, user) => ({
    ...state,
    [user.id]: user
  }), {});
  yield put(usersUpdate(data));
  const list = yield select(getUsers);
  yield call(AsyncStorage.setItem, '@state:users', JSON.stringify(list));
}

function* usersRestoreAction() {
  try {
    const json = yield call(AsyncStorage.getItem, '@state:users');
    const data = JSON.parse(json);
    if (data) {
      yield put(usersRestore(data));
    }
  } catch (e) {
    console.log(e.message);
  }
}

export function* usersWatcher() {
  yield call(usersRestoreAction);
  yield fork(takeEvery, USERS_LIST, usersListAction);
}
