import { createAction } from 'redux-actions';
import { call, put, fork, takeEvery, takeLatest } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import fbQuery from '../api/facebook';

const USER_LOGIN = 'USER_LOGIN';
const USER_TRY_AUTH = 'USER_TRY_AUTH';
const USER_FACEBOOK_AUTH = 'USER_FACEBOOK_AUTH';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_ERROR = 'USER_ERROR';

const $$initialState = {
  auth: false
};

export default function reducer($$state = $$initialState, { type, payload }) {
  switch (type) {
    case USER_LOGIN:
      return payload;
    case USER_LOGOUT:
      return $$initialState;
    case USER_ERROR:
      return {
        ...$$state,
        error: payload
      };
    default:
      return $$state;
  }
}

export const userLogin = createAction(USER_LOGIN);

export const userError = createAction(USER_ERROR);

export const userTryAuth = createAction(USER_TRY_AUTH);

export const userFacebookAuth = createAction(USER_FACEBOOK_AUTH);

export const userLogout = createAction(USER_LOGOUT);

function* userFetchFacebookAuthAction({ payload }) {
  try {
    const data = yield call(fbQuery, '/me', {
      string: 'id,email,name,first_name,middle_name,last_name'
    }, payload);

    yield call(AsyncStorage.setItem, '@state:user', JSON.stringify(data));
    yield put(userLogin({ ...data, auth: true }));
  } catch (e) {
    yield put(userError(e.message));
  }
}

function* userTryAuthAction() {
  try {
    const data = yield AccessToken.getCurrentAccessToken();
    const token = data.accessToken.toString();
    yield call(AsyncStorage.setItem, '@state:token', token);
    yield put(userFacebookAuth(token));
  } catch (e) {
    yield put(userError(e.message));
  }
}

function* userRestoreAction() {
  try {
    const json = yield call(AsyncStorage.getItem, '@state:user');
    const data = JSON.parse(json);
    if (data) {
      yield put(userLogin({ ...data, auth: true }));
    }
  } catch (e) {
    console.log(e.message);
  }
}

function* userLogoutAction() {
  yield LoginManager.logOut();
  yield call(AsyncStorage.removeItem, '@state:user');
}

export function* user() {
  yield call(userRestoreAction);
  yield fork(takeEvery, USER_TRY_AUTH, userTryAuthAction);
  yield fork(takeEvery, USER_LOGOUT, userLogoutAction);
  yield fork(takeEvery, USER_FACEBOOK_AUTH, userFetchFacebookAuthAction);
}