import { user } from './reducers/user';

export default function* rootSaga() {
  yield [
    user()
  ];
}