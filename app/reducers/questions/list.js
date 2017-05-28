import _ from 'lodash';
import { fork, put, call, select, takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';
import Questions from '../../api/questions'
import { usersList } from '../users';
import { selectForm, questionFormReset } from './question';
import { appQuestionsRefreshing } from '../app';

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
  yield put(appQuestionsRefreshing(true));
  const data = yield questionsModel.all();
  const users = data.map(question => question.user_id);
  yield put(usersList(_.uniq(users)));
  yield put(resetQuestions(data));
  yield put(appQuestionsRefreshing(false));
  yield call(updateQuestionsStorage);
}

export function* questionsList() {
  yield fork(takeEvery, QUESTIONS_FETCH, fetchQuestionsAction);
  yield call(questionsListRestoreAction);
}
