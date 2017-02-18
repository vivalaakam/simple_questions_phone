import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import Form from '../../containers/Todos/Form';
import List from './List';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    borderColor: 'gray', borderWidth: 1, height: 50
  }
});

export default class Todos extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form />
        <List list={this.props.todos} toggle={this.props.toggle} destroy={this.props.destroy} />
      </View>
    )
  }
}