import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';

import Container from './UI/Container';
import TextInput from './UI/TextInput';
import Button from './UI/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F5FCFF'
  },
  shareText: {
    fontSize: 20,
    margin: 10
  },
  login: {
    marginBottom: 8
  }
});

export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    userLogin: PropTypes.func
  };

  static defaultProps = {
    user: {}
  };

  onPressFacebook = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(this.props.userLogin)
  };

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <TextInput
            first
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={this.props.userAuthEmail}
          />
          <TextInput
            last
            secureTextEntry
            placeholder="Пароль"
            onChangeText={this.props.userAuthPassword}
          />
        </Container>
        <Button title="Войти" onPress={this.props.userAuth} style={styles.login} />
        <Button title="Войти с помощью Facebook" onPress={this.onPressFacebook} />
      </View>
    );
  }
}
