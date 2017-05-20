import _ from 'lodash';
import uuid4 from 'uuid/v4';
import { put, select, call, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-redux-router';


import { merge } from '../../helpers/ramda';
import { usersList } from '../users';
import Questions from '../../api/questions';

const apiQuestions = new Questions();

const QUESTION_CHANGE = 'QUESTION_CHANGE';
const QUESTION_DELETE = 'QUESTION_DELETE';
const QUESTION_DESTROY = 'QUESTION_DESTROY';
const QUESTION_CREATE = 'QUESTION_CREATE';
const QUESTION_UPDATE = 'QUESTION_UPDATE';
const QUESTION_RESET = 'QUESTION_RESET';
const QUESTION_ADDITION_TOGGLE = 'QUESTION_ADDITION_TOGGLE';
const QUESTION_ADDITION_CREATE = 'QUESTION_ADDITION_CREATE';
const QUESTION_ANSWER_CREATE = 'QUESTION_ANSWER_CREATE';

const QUESTION_FORM_TEXT = 'QUESTION_FORM_TEXT';
const QUESTION_FORM_TITLE = 'QUESTION_FORM_TITLE';
const QUESTION_FORM_RESET = 'QUESTION_FORM_RESET';

export const $$initialState = {
  id: '',
  title: '',
  text: '',
  isNew: true,
  addition: false,
  additionText: '',
  answerText: '',
  additions: [],
  answers: []
};

export default function question($$state = $$initialState, { type, payload }) {
  switch (type) {
    case QUESTION_CHANGE:
      return merge($$state, payload);
    case QUESTION_DESTROY:
      return $$initialState;
    case QUESTION_RESET:
      return payload;
    default:
      return $$state;
  }
}

export const createQuestion = createAction(QUESTION_CREATE);

export const updateQuestion = createAction(QUESTION_UPDATE);

export const deleteQuestion = createAction(QUESTION_DELETE);

export const destroyQuestion = createAction(QUESTION_DESTROY);

export const resetQuestion = createAction(QUESTION_RESET);

export const changeQuestion = createAction(QUESTION_CHANGE);

export const toggleAdditionQuestion = createAction(QUESTION_ADDITION_TOGGLE);

export const createAdditionQuestion = createAction(QUESTION_ADDITION_CREATE);

export const createAnswerQuestion = createAction(QUESTION_ANSWER_CREATE);

function getQuestion(state) {
  return state.questions.question;
}

function* createQuestionAction() {
  const { additionText, answerText, ...data } = yield select(getQuestion);
  const questionData = yield apiQuestions.create(data);
  yield put(resetQuestion(questionData));
  Actions.question_show({ id: questionData.id })
}

function* updateQuestionAction() {
  const { id, additionText, answerText, ...props } = yield select(getQuestion);
  const questionData = yield apiQuestions.update(id, props);
  yield put(resetQuestion(questionData));
}

function* createAdditionQuestionAction() {
  const { id, additionText } = yield select(getQuestion);
  try {
    const questionData = yield apiQuestions.addition(id, { text: additionText });
    yield put(resetQuestion({ ...questionData, additionText: '', addition: false }));
  } catch (e) {
    console.log(e.message);
  }
}

function* createAnswerQuestionAction() {
  const { id, answerText } = yield select(getQuestion);
  const questionData = yield apiQuestions.answer(id, { text: answerText });
  yield put(resetQuestion({ ...questionData, answerText: '' }));
}

function* deleteQuestionAction({ payload: { id } }) {
  yield apiQuestions.remove(id);
  yield put(destroyQuestion(id));
}

function* toggleAdditionQuestionAction() {
  const { addition } = yield select(getQuestion);
  yield put(changeQuestion({ addition: !addition }));
}

export function* fetchQuestionAction(id) {
  const questionData = yield apiQuestions.fetch(id);
  const users = questionData.answers.map(answer => answer.user_id);
  yield put(usersList(_.uniq(users)));

  yield put(resetQuestion({ ...questionData, isNew: false, additionText: '', answerText: '' }));
}

export function* resetQuestionInitial() {
  yield put(resetQuestion({ ...$$initialState, id: uuid4() }));
}

export function* getQuestionWatcher() {
  yield takeLatest(QUESTION_CREATE, createQuestionAction);
  yield takeLatest(QUESTION_UPDATE, updateQuestionAction);
  yield takeLatest(QUESTION_DELETE, deleteQuestionAction);
  yield takeLatest(QUESTION_ADDITION_TOGGLE, toggleAdditionQuestionAction);
  yield takeLatest(QUESTION_ADDITION_CREATE, createAdditionQuestionAction);
  yield takeLatest(QUESTION_ANSWER_CREATE, createAnswerQuestionAction);
}
