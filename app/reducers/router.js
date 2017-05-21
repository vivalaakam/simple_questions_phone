import { put, select, call, fork, takeLatest } from 'redux-saga/effects';
import { REPLACE } from 'react-native-redux-router/actions'

import { fetchQuestions } from './questions/list'
import { resetQuestionInitial, fetchQuestionAction } from './questions/question'
import { userFetchAction } from './user';

function* changeLocation({ name, data }) {
  switch (name) {
    case 'questions':
      yield put(fetchQuestions());
      break;
    case 'questions_add':
      yield call(resetQuestionInitial);
      break;
    case 'question_show':
      yield call(fetchQuestionAction, data.id);
      break;
    case 'settings':
      yield call(userFetchAction, { payload: true });
      break;
  }
}

export function* routerWatcher() {
  yield takeLatest(REPLACE, changeLocation);
}
