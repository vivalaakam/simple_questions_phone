import { Platform } from 'react-native';
import { createAction } from 'redux-actions';
import { put, fork, takeEvery, take, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import PushNotification from 'react-native-push-notification';

import { resetSearchApp } from './app';
import { append, removeByKey } from '../helpers/ramda';
import Socket from '../api/socket';
import Notifications from '../api/notifications';
import navigate from './navigate'

const notificationsApi = new Notifications();

const NOTIFICATION_CREATE = 'NOTIFICATION_CREATE';
const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';
const NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE';
const NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR';
const NOTIFICATION_RESET = 'NOTIFICATION_RESET';
const NOTIFICATION_REQUEST = 'NOTIFICATION_REQUEST';
const NOTIFICATION_SAVE = 'NOTIFICATION_SAVE';
const NOTIFICATION_CANCEL = 'NOTIFICATION_CANCEL';

const $$initialState = [];

export default function modal($$state = $$initialState, { type, payload }) {
  switch (type) {
    case NOTIFICATION_CREATE:
      return append($$state, payload);
    case NOTIFICATION_REMOVE:
      return removeByKey($$state, payload.id, 'id');
    case NOTIFICATION_RESET:
      return $$initialState;
    default:
      return $$state;
  }
}

export const createNotification = createAction(NOTIFICATION_CREATE);
export const closeNotification = createAction(NOTIFICATION_CLOSE);
export const removeNotification = createAction(NOTIFICATION_REMOVE);
export const clearNotification = createAction(NOTIFICATION_CLEAR);
export const resetNotification = createAction(NOTIFICATION_RESET);
export const requestNotification = createAction(NOTIFICATION_REQUEST);
export const saveNotification = createAction(NOTIFICATION_SAVE);

function* closeNotificationAction({ payload }) {
  yield notificationsApi.remove(payload.id);
  yield put(removeNotification(payload));
}

function* clearNotificationAction() {
  yield notificationsApi.clear();
  yield put(resetNotification());
  yield put(resetSearchApp({ notificationsActive: false }));
}

function* registerNotificationsAction() {
  const permissions = () => eventChannel((emitter) => {
    PushNotification.configure({
      onRegister: ({ token, os }) => {
        emitter({ token, os });
      }
    });

    return () => {
    }
  });

  const subscription = yield call(permissions);
  PushNotification.requestPermissions();

  const data = yield take(subscription);
  yield put(saveNotification(data));
}

function* saveTokenNotificationAction({ payload }) {
  notificationsApi.subscribe(JSON.stringify(payload), payload.os);
}

function* cancelNotificationAction() {
  if (Platform.OS === 'ios') {
    PushNotification.abandonPermissions()
  }
}

function* notificationsAction() {
  const permissions = () => eventChannel((emitter) => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        emitter(notification);
      }
    });

    return () => {
    }
  });

  const subscription = yield call(permissions);
  while (true) {
    const data = yield take(subscription);
    if (data.userInteraction) {
      yield put(navigate('Question', { id: data.data.source_id }));
      yield put(closeNotification(data.data));
    } else {
      yield put(createNotification({ ...data.data, is_new: true }));
    }
  }
}

export function* notificationsWatcher() {
  yield fork(takeEvery, NOTIFICATION_CLOSE, closeNotificationAction);
  yield fork(takeEvery, NOTIFICATION_CLEAR, clearNotificationAction);
  yield fork(takeEvery, NOTIFICATION_REQUEST, registerNotificationsAction);
  yield fork(takeEvery, NOTIFICATION_SAVE, saveTokenNotificationAction);
  yield fork(takeEvery, NOTIFICATION_CANCEL, cancelNotificationAction);
  yield fork(notificationsAction);
  const socket = yield Socket.getChannel();
  const socketChannel = yield call(Socket.subscribe.bind(Socket), socket, 'NotificationChannel');
  while (true) {
    const payload = yield take(socketChannel);
    if (payload.message) {
      yield put(createNotification({ ...payload.message, is_new: true }));
    }
  }
}
