import { createAction } from 'redux-actions';
import { Actions } from 'react-native-redux-router';
import { call, select, put, fork, takeEvery } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import Auth from '../api/auth';
import fbQuery from '../api/facebook';
import { merge } from '../helpers/ramda';
import token from '../utils/token';


const authModel = new Auth();

const USER_LOGIN = 'USER_LOGIN';
const USER_AUTH = 'USER_AUTH';
const USER_TRY_AUTH = 'USER_TRY_AUTH';
const USER_FACEBOOK_AUTH = 'USER_FACEBOOK_AUTH';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_ERROR = 'USER_ERROR';
const USER_CHANGE = 'USER_CHANGE'

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
    case USER_CHANGE:
      return merge($$state, payload);
    default:
      return $$state;
  }
}

export const userLogin = createAction(USER_LOGIN);

export const userError = createAction(USER_ERROR);

export const userTryAuth = createAction(USER_TRY_AUTH);

export const userAuth = createAction(USER_AUTH);

export const userFacebookAuth = createAction(USER_FACEBOOK_AUTH);

export const userLogout = createAction(USER_LOGOUT);

export const userChange = createAction(USER_CHANGE);

function getUser(state) {
  return state.user;
}

function* userAuthAction() {
  const { email, password } = yield select(getUser);
  console.log({ email, password });
  try {
    const userData = yield authModel.auth({ email, password });
    yield call(AsyncStorage.setItem, '@state:user', JSON.stringify(userData));
    yield put(userLogin({ ...userData, auth: true }));
    if (userData.token) {
      token.setToken(userData.token);
    }
    Actions.questions()
  } catch (e) {
    yield put(userError(e.message));
  }
}

function* userFetchFacebookAuthAction({ payload }) {
  try {
    const params = yield call(fbQuery, '/me', {
      string: 'id,email,name,first_name,middle_name,last_name'
    }, payload);

    const data = yield authModel.provider('facebook', params.id, payload);
    yield call(AsyncStorage.setItem, '@state:user', JSON.stringify(data));
    yield put(userLogin({ ...data, auth: true }));
    if (data.token) {
      token.setToken(data.token);
    }
    Actions.questions()
  } catch (e) {
    yield put(userError(e.message));
  }
}

function* userTryAuthAction() {
  try {
    const data = yield AccessToken.getCurrentAccessToken();
    const fbtoken = data.accessToken.toString();
    yield call(AsyncStorage.setItem, '@state:fbtoken', fbtoken);
    yield put(userFacebookAuth(fbtoken));
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
  token.removeToken()

}

export function* user() {
  yield call(userRestoreAction);
  yield fork(takeEvery, USER_AUTH, userAuthAction);
  yield fork(takeEvery, USER_TRY_AUTH, userTryAuthAction);
  yield fork(takeEvery, USER_LOGOUT, userLogoutAction);
  yield fork(takeEvery, USER_FACEBOOK_AUTH, userFetchFacebookAuthAction);
}
