/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Login from './app/components/Login';

export default class phone extends Component {
  render() {
    return (
      <Login />
    );
  }
}

AppRegistry.registerComponent('phone', () => phone);
