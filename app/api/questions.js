import Rest from './rest';

export default class Questions extends Rest {
  constructor() {
    super('/questions');
  }

  addition(id, { text }) {
    return this.postQuery(`${this.getUrl()}/${id}/addition`, { text });
  }

  answer(id, { text }) {
    return this.postQuery(`${this.getUrl()}/${id}/answer`, { text });
  }
}
