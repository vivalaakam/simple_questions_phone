import React, { Component, PropTypes } from 'react';
import { Keyboard, View, StyleSheet, TextInput, Animated } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexBasis: 40,
    padding: 10,
    backgroundColor: '#474f60',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16
  },
  text: {
    backgroundColor: '#e1e4e9',
    padding: 5,
    borderRadius: 3,
    overflow: 'hidden',
    color: '#474f60',
    textAlign: 'center',
    fontSize: 16
  }
});

const ORIGINAL_HEIGHT = 46;

export default class Form extends Component {
  static propTypes = {
    form: PropTypes.object,
    createTodo: PropTypes.func,
    todoFormText: PropTypes.func
  };

  height = new Animated.Value(ORIGINAL_HEIGHT);
  stopped = false;

  handleChangeTodoText = (text) => {
    if (!this.stopped) {
      this.props.todoFormText(text);
    }
  };

  onChange = (e) => {
    if (!this.stopped) {
      this.height.setValue(e.nativeEvent.contentSize.height + 20);
    }
  };

  onKeyDown = (e) => {
    if (e.nativeEvent.key === "Enter") {
      this.stopped = true;
      if (this.props.form.text) {
        this.props.createTodo();
      }
      this.height.setValue(ORIGINAL_HEIGHT);
      Keyboard.dismiss();
    } else {
      this.stopped = false;
    }
  };

  render() {
    return (
      <Animated.View style={[styles.container , { flexBasis: this.height}]}>
        <TextInput style={styles.input}
                   multiline={true}
                   value={this.props.form.text}
                   placeholder="Add todo"
                   onChange={this.onChange}
                   returnKeyType="done"
                   placeholderTextColor="#e1e4e9"
                   onKeyPress={this.onKeyDown}
                   onChangeText={this.handleChangeTodoText} />
      </Animated.View>
    )
  }
}