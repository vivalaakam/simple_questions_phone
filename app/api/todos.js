import Rest from './rest';

export default class Todos extends Rest {
  constructor() {
    super('/todos');
  }

  completeAll() {
    return this.postQuery(`${this.base_url}/completeAll`);
  }

  clearCompleted() {
    return this.deleteQuery(`${this.base_url}/clearCompleted`);
  }
}
