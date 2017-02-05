import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  },
});

export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    userLogin: PropTypes.func
  };

  static defaultProps = {
    user: {}
  };

  render() {
    const { userLogin } = this.props;

    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={userLogin} />
      </View>
    );
  }
}