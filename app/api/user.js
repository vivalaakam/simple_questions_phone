import queryString from 'query-string';
import Rest from './rest';

export default class User extends Rest {
  constructor() {
    super('user');
  }

  update(data) {
    return this.postQuery(this.getUrl(), data);
  }

  password({ password, password_confirmation }) {
    return this.postQuery(this.getUrl('/password'), { password, password_confirmation });
  }

  fetch() {
    return this.getQuery(this.getUrl());
  }

  list(users = []) {
    const string = queryString.stringify({ users }, { arrayFormat: 'bracket' });
    return this.getQuery(this.getUrl('/list', string));
  }
}
