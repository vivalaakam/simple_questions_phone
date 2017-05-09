import { user } from './reducers/user';
import { todosList } from './reducers/todos/list';
import { questionsList } from './reducers/questions/list';
import { getQuestionWatcher } from './reducers/questions/question';
import { routerWatcher } from './reducers/router';


export default function* rootSaga() {
  yield [
    routerWatcher(),
    user(),
    todosList(),
    questionsList(),
    getQuestionWatcher()
  ];
}
