import { createAction } from 'redux-actions';
import { put, fork, takeEvery, take, call } from 'redux-saga/effects';
import { resetSearchApp } from './app';
import { append, removeByKey } from '../helpers/ramda';
import Socket from '../api/socket';
import Notifications from '../api/notifications';

const notificationsApi = new Notifications();

const NOTIFICATION_CREATE = 'NOTIFICATION_CREATE';
const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';
const NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE';
const NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR';
const NOTIFICATION_RESET = 'NOTIFICATION_RESET';

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

function* closeNotificationAction({ payload }) {
  yield notificationsApi.remove(payload.id);
  yield put(removeNotification(payload));
}

function* clearNotificationAction() {
  yield notificationsApi.clear();
  yield put(resetNotification());
  yield put(resetSearchApp({ notificationsActive: false }));
}

export function* notificationsWatcher() {
  yield fork(takeEvery, NOTIFICATION_CLOSE, closeNotificationAction);
  yield fork(takeEvery, NOTIFICATION_CLEAR, clearNotificationAction);
  const socket = yield Socket.getChannel();
  const socketChannel = yield call(Socket.subscribe.bind(Socket), socket, 'NotificationChannel');
  while (true) {
    const payload = yield take(socketChannel);
    if (payload.message) {
      yield put(createNotification({ ...payload.message, is_new: true }));
    }
  }
}
