import ActionCable from 'react-native-actioncable'
import Config from 'react-native-config'

import { eventChannel } from 'redux-saga';
import token from '../utils/token';

class Channel {
  async getChannel() {
    const jwt = await token.asyncGetToken();

    if (!this.channel) {
      this.channel = ActionCable.createConsumer(`${Config.PROXY_SERVER}/cable?token=${jwt}`);
    }

    return this.channel
  }

  subscribe(channel, channelName) {
    return eventChannel((emitter) => {
      const subscription = channel.subscriptions.create(channelName, {
        received: data => emitter(data)
      });

      return () => {
        subscription.remove(channel);
      };
    });

  }
}

export default new Channel();
