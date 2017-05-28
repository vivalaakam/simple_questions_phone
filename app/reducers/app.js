import { createAction } from 'redux-actions';
import { select, put, fork, takeEvery } from 'redux-saga/effects'

import { merge } from '../helpers/ramda';

const APP_CHANGE = 'APP_CHANGE';
const APP_TOGGLE_MENU = 'APP_TOGGLE_MENU';
const APP_QUESTIONS_REFRESHING = 'APP_QUESTIONS_REFRESHING';

const $$initialState = {
  menu: false,
  questions_refreshing: false
};

export default function reducer($$state = $$initialState, { type, payload }) {
  switch (type) {
    case APP_CHANGE:
      return merge($$state, payload);
    default:
      return $$state;
  }
}

export const appChange = createAction(APP_CHANGE);
export const appQuestionsRefreshing = createAction(APP_QUESTIONS_REFRESHING);

export const toggleAppMenu = createAction(APP_TOGGLE_MENU);

function appSelect(state) {
  return state.app;
}

function* appToggleMenuAction() {
  const { menu, ...data } = yield select(appSelect);
  yield put(appChange({ ...data, menu: !menu }));
}

function* appQuestionsRefreshingAction({ payload }) {
  yield put(appChange({ questions_refreshing: payload }));
}

export function* appWatcher() {
  yield fork(takeEvery, APP_TOGGLE_MENU, appToggleMenuAction);
  yield fork(takeEvery, APP_QUESTIONS_REFRESHING, appQuestionsRefreshingAction);
}
