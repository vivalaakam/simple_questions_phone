/* eslint class-methods-use-this: "off" */

import token from '../utils/token';

export default class Rest {
  url = 'http://127.0.0.1:3001';

  constructor(url) {
    this.base_url = url;
    this.restoreToken();
  }

  getUrl = (subpath = '', params = null) => {
    if (!params) {
      return `${this.url}/${this.base_url}${subpath}`;
    }

    return `${this.url}/${this.base_url}${subpath}?${params}`;
  };

  setToken = (token) => {
    this._token = token
  };

  restoreToken() {
    token.getToken(this.setToken);
  }

  create(data) {
    return this.postQuery(`${this.getUrl()}`, data);
  }

  update(id, data) {
    return this.putQuery(`${this.getUrl()}/${id}`, data);
  }

  fetch(id) {
    return this.getQuery(`${this.getUrl()}/${id}`);
  }

  all() {
    return this.getQuery(`${this.getUrl()}`);
  }

  remove(id) {
    return this.deleteQuery(`${this.getUrl()}/${id}`);
  }

  getQuery(url) {
    return fetch(url, this.options())
      .then(Rest.afterQuery)
      .then(response => response.json());
  }

  postQuery(url, data) {
    return fetch(url, this.options({
      method: 'POST',
      body: JSON.stringify(data)
    }))
      .then(Rest.afterQuery)
      .then(response => response.json());
  }

  putQuery(url, data) {
    return fetch(url, this.options({
      method: 'PUT',
      body: JSON.stringify(data)
    }))
      .then(Rest.afterQuery)
      .then(response => response.json());
  }

  deleteQuery(url) {
    return fetch(url, this.options({
      method: 'DELETE'
    }))
      .then(Rest.afterQuery)
      .then(() => true);
  }

  static async handleError(response) {
    const resp = await response.json();
    throw new Error(resp.message);
  }

  static afterQuery(response) {
    if (!response.ok) {
      return Rest.handleError(response);
    }
    token.setToken(response.headers.get('Authorization'));

    return response;
  }

  options(params = {}) {
    const headers = {
      Accept: 'application/json',
      Authorization: `JWT ${this._token}`,
      'Content-Type': 'application/json'
    };

    return {
      headers,
      mode: 'cors',
      credentials: 'include',
      ...params
    };
  }
}
