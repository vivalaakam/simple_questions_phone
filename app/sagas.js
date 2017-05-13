import { user } from './reducers/user';
import { todosList } from './reducers/todos/list';
import { questionsList } from './reducers/questions/list';
import { getQuestionWatcher } from './reducers/questions/question';
import { routerWatcher } from './reducers/router';
import { appWatcher } from './reducers/app'


export default function* rootSaga() {
  yield [
    appWatcher(),
    routerWatcher(),
    user(),
    todosList(),
    questionsList(),
    getQuestionWatcher()
  ];
}
