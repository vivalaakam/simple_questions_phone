import { put, call, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation'
import { fetchQuestions } from './questions/list'
import { resetQuestionInitial, fetchQuestionAction } from './questions/question'
import { userFetchAction } from './user';
import navigate from './navigate'

import AppNavigator from '../Navigator'

const $$initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Questions'));

export default function router($$state = $$initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, $$state);
  return nextState || $$state;
}

export {
  navigate
}

function* changeLocation({ routeName, params }) {
  switch (routeName) {
    case 'Questions':
      yield put(fetchQuestions());
      break;
    case 'QuestionsForm':
      yield call(resetQuestionInitial);
      break;
    case 'Question':
      yield call(fetchQuestionAction, params);
      break;
    case 'Settings':
      yield call(userFetchAction, { payload: true });
      break;
  }
}

export function* routerWatcher() {
  yield takeLatest(NavigationActions.NAVIGATE, changeLocation);
}
