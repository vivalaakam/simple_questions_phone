import Rest from './rest';

export default class Auth extends Rest {
  constructor() {
    super('/auth');
  }

  current() {
    return this.getQuery(this.getUrl());
  }

  auth({ email, password }) {
    return this.postQuery(this.getUrl(), { email, password });
  }

  provider(provider, uid, token, expires = false) {
    return this.postQuery(`${this.getUrl()}/provider`, {
      provider,
      uid,
      credentials: {
        token, expires
      }
    });
  }
}
