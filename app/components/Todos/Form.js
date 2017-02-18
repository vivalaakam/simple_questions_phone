import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexBasis: 60,
    padding: 10
  },
  input: {
    borderColor: 'gray', borderWidth: 1, height: 50, padding: 5
  }
});

export default class Form extends Component {
  static propTypes = {
    form: PropTypes.object,
    createTodo: PropTypes.func,
    todoFormText: PropTypes.func
  };

  handleChangeTodoText = (text) => {
    this.props.todoFormText(text);
  };

  handleSubmit = () => {
    this.props.createTodo()
  };

  renderButton() {
    if (this.props.form.text.length) {
      return (
        <Button onPress={this.handleSubmit} title="Save" />
      );
    }

    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
                   multiline={true}
                   numberOfLines={4}
                   value={this.props.form.text}
                   onChangeText={this.handleChangeTodoText} />
        {this.renderButton()}
      </View>
    )
  }
}