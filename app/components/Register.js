import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Register extends Component {
  render() {
    let Actions = this.props.routes;

    return (
      <View style={styles.container}>
        <Text>Register page</Text>
        <Button onPress={Actions.home}>Home</Button>
        <Button onPress={Actions.pop}>Back</Button>
      </View>
    );
  }
}