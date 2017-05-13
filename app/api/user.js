import Rest from './rest';

export default class User extends Rest {
  constructor() {
    super('user');
  }

  update(data) {
    return this.postQuery(this.getUrl(), data);
  }

  fetch() {
    return this.getQuery(this.getUrl());
  }
}
