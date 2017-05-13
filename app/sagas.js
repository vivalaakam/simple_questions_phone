import { user } from './reducers/user';
import { usersWatcher } from './reducers/users';
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
    usersWatcher(),
    todosList(),
    questionsList(),
    getQuestionWatcher()
  ];
}
