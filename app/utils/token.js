import { AsyncStorage } from 'react-native';

const KEY = '@state:jwt';

export default {
  async asyncGetToken() {
    const token = await AsyncStorage.getItem(KEY);
    return token;
  },
  getToken(callback) {
    return AsyncStorage.getItem(KEY, (err, result) => {
      callback(result)
    });
  },
  setToken(jwt) {
    if (jwt) {
      const [, token] = jwt.split(' ');
      AsyncStorage.setItem(KEY, token);
    }
  },
  removeToken() {
    AsyncStorage.removeItem(KEY);
  }
};
