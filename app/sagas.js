import { user } from './reducers/user';
import { usersWatcher } from './reducers/users';
import { questionsList } from './reducers/questions/list';
import { getQuestionWatcher } from './reducers/questions/question';
import { routerWatcher } from './reducers/router';
import { appWatcher } from './reducers/app'
import { notificationsWatcher } from './reducers/notifications';

export default function* rootSaga() {
  yield [
    appWatcher(),
    routerWatcher(),
    user(),
    usersWatcher(),
    questionsList(),
    getQuestionWatcher(),
    notificationsWatcher()
  ];
}
