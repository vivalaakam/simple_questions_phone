import { createAction } from 'redux-actions';
import { call, select, put, fork, takeEvery } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import Auth from '../api/auth';
import User from '../api/user';
import fbQuery from '../api/facebook';
import { merge } from '../helpers/ramda';
import token from '../utils/token';
import navigate from './navigate'
import { requestNotification, emptyNotifications } from './notifications'

const authModel = new Auth();
const userModel = new User();

const USER_LOGIN = 'USER_LOGIN';
const USER_AUTH = 'USER_AUTH';
const USER_TRY_AUTH = 'USER_TRY_AUTH';
const USER_FACEBOOK_AUTH = 'USER_FACEBOOK_AUTH';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_ERROR = 'USER_ERROR';
const USER_CHANGE = 'USER_CHANGE';
const USER_UPDATE = 'USER_UPDATE';
const USER_UPDATE_PASSWORD = 'USER_UPDATE_PASSWORD';
const USER_TOKEN_REMOVE = 'USER_TOKEN_REMOVE';
const USER_NOTIFICATION_REMOVE = 'USER_NOTIFICATION_REMOVE';
const USER_SAVE = 'USER_SAVE';

const $$initialState = {
  auth: false,
  password: '',
  password_confirmation: ''
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

export const userSave = createAction(USER_SAVE);

export const userLogin = createAction(USER_LOGIN);

export const userError = createAction(USER_ERROR);

export const userTryAuth = createAction(USER_TRY_AUTH);

export const userAuth = createAction(USER_AUTH);

export const userFacebookAuth = createAction(USER_FACEBOOK_AUTH);

export const userLogout = createAction(USER_LOGOUT);

export const userChange = createAction(USER_CHANGE);

export const userUpdate = createAction(USER_UPDATE);

export const userPasswordUpdate = createAction(USER_UPDATE_PASSWORD);

export const userTokenRemove = createAction(USER_TOKEN_REMOVE);

export const userNotificationRemove = createAction(USER_NOTIFICATION_REMOVE);

function getUser(state) {
  return state.user;
}

export function* userFetchAction({ payload }) {
  try {
    const data = yield userModel.fetch(payload);
    yield put(userSave(data));
  } catch (e) {
    console.log(e.message);
  }
}

function* userAuthAction() {
  const { email, password } = yield select(getUser);
  try {
    const data = yield authModel.auth({ email, password });
    yield put(userSave(data));
    yield put(requestNotification());
    yield put(navigate('Questions'))
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
    yield put(userSave(data));
    yield put(requestNotification());
    yield put(navigate('Questions'))
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
      yield put(userLogin({
        ...data,
        auth: true,
        tmp_first_name: data.first_name,
        tmp_last_name: data.last_name
      }));
    }
  } catch (e) {
    console.log(e.message);
  }
}

function* userLogoutAction() {
  yield LoginManager.logOut();
  yield call(AsyncStorage.removeItem, '@state:user');
  yield put(emptyNotifications());
  token.removeToken()
}

function* userUpdateAction() {
  const { tmp_first_name, tmp_last_name } = yield select(getUser);
  const data = yield userModel.update({ first_name: tmp_first_name, last_name: tmp_last_name });
  yield put(userSave(data));
}

function* updateUserPasswordAction() {
  const { password, password_confirmation } = yield select(getUser);
  if (password === password_confirmation) {
    yield put(userChange({ wrongPassword: false, smallPassword: false }));
    if (!password || password.length < 8) {
      yield put(userChange({ smallPassword: true }));
      return;
    }
    const data = yield userModel.password({ password, password_confirmation });
    yield put(userSave(data));
  } else {
    yield put(userChange({ wrongPassword: true }));
  }
}

function* removeTokenAction({ payload }) {
  const data = yield userModel.removeToken(payload.id);
  yield put(userSave(data));
}

function* removeNotificationAction({ payload }) {
  const data = yield userModel.removeNotification(payload.id);
  yield put(userSave(data));
}

function* userSaveAction({ payload }) {
  yield call(AsyncStorage.setItem, '@state:user', JSON.stringify(payload));
  yield put(userLogin({
    ...payload,
    auth: true,
    tmp_first_name: payload.first_name,
    tmp_last_name: payload.last_name,
    password: '',
    password_confirmation: ''
  }));
  if (payload.token) {
    token.setToken(payload.token);
  }
}

export function* user() {
  yield call(userRestoreAction);
  yield fork(takeEvery, USER_AUTH, userAuthAction);
  yield fork(takeEvery, USER_SAVE, userSaveAction);
  yield fork(takeEvery, USER_TRY_AUTH, userTryAuthAction);
  yield fork(takeEvery, USER_LOGOUT, userLogoutAction);
  yield fork(takeEvery, USER_UPDATE, userUpdateAction);
  yield fork(takeEvery, USER_TOKEN_REMOVE, removeTokenAction);
  yield fork(takeEvery, USER_NOTIFICATION_REMOVE, removeNotificationAction);
  yield fork(takeEvery, USER_UPDATE_PASSWORD, updateUserPasswordAction);
  yield fork(takeEvery, USER_FACEBOOK_AUTH, userFetchFacebookAuthAction);
}
