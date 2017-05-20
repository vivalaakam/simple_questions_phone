import Rest from './rest';

export default class Notifications extends Rest {
  constructor() {
    super('/api/notifications');
  }

  subscribe(notification, device) {
    return this.postQuery(this.getUrl(), { notification, device });
  }

  unsubscribe() {
    return this.deleteQuery(this.getUrl());
  }

  remove(id) {
    return this.deleteQuery(this.getUrl(`/${id}`));
  }

  clear() {
    return this.postQuery(this.getUrl('/clear'));
  }
}
