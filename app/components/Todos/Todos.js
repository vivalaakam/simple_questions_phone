import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import Form from '../../containers/Todos/Form';
import List from './List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default class Todos extends Component {
  state = {
    keyboard: false
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <List list={this.props.todos} toggle={this.props.toggle} destroy={this.props.destroy} />
        <Form />
      </KeyboardAvoidingView>
    )
  }
}
