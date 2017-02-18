import { user } from './reducers/user';
import { todosList } from './reducers/todos/list';

export default function* rootSaga() {
  yield [
    user(),
    todosList()
  ];
}