import { fork, put, call, select, takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-redux-router';
import uuid4 from 'uuid/v4';
import Questions from '../../api/questions'

import { append, removeByKey, replace } from '../../helpers/ramda';
import { selectForm, questionFormReset } from './question';

const questionsModel = new Questions();

const QUESTIONS_FETCH = 'QUESTIONS_FETCH';
const QUESTIONS_RESET = 'QUESTIONS_RESET';

const $$initialState = [];

export default function list($$state = $$initialState, { type, payload }) {
  switch (type) {
    case QUESTIONS_RESET:
      return payload;
    default:
      return $$state;
  }
}

export const resetQuestions = createAction(QUESTIONS_RESET);

export const fetchQuestions = createAction(QUESTIONS_FETCH);

function getQuestions(state) {
  return state.questions.list;
}

function* updateQuestionsStorage() {
  const questions = yield select(getQuestions);
  yield call(AsyncStorage.setItem, `@state:questions`, JSON.stringify(questions));
}

function* questionsListRestoreAction() {
  try {
    const json = yield call(AsyncStorage.getItem, '@state:questions');
    const data = JSON.parse(json);
    if (data) {
      yield put(resetQuestions(data));
    }
  } catch (e) {
    console.log(e.message);
  }
}

function* fetchQuestionsAction() {
  const data = yield questionsModel.all();
  yield put(resetQuestions(data));
  yield call(updateQuestionsStorage);
}

export function* questionsList() {
  yield fork(takeEvery, QUESTIONS_FETCH, fetchQuestionsAction);
  yield call(questionsListRestoreAction);
}
