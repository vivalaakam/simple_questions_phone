import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Button from 'react-native-button';
import Login from '../containers/Login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
   // alignItems: 'center',
    backgroundColor: 'transparent',
  }
});

export default class Launch extends Component {
  static propTypes = {
    routes: PropTypes.object,
    user: PropTypes.object,
    userLogout: PropTypes.func
  };

  static defaultProps = {
    user: {}
  };

  render() {
    const { routes, user, userLogout } = this.props;
    if (!user.auth) {
      return (
        <Login {...this.props} />
      );
    }

    return (
      <View style={styles.container}>
        <Text>Launch page</Text>
        <Button onPress={()=>routes.error("Error message")}>Go to Error page</Button>
        <Button onPress={()=>routes.todos()}>Todos</Button>
        <Button onPress={userLogout}>Logout</Button>
      </View>
    );
  }
}