import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, TextInput, Button, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: '#474f60',
    borderRadius: 5
  },
  input: {
    height: 50,
    padding: 5,
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
        <TouchableHighlight onPress={this.handleSubmit} underlayColor="transparent">
          <Text style={styles.text}>Save</Text>
        </TouchableHighlight>
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
                   placeholder="Add todo"
                   placeholderTextColor="#e1e4e9"
                   onChangeText={this.handleChangeTodoText} />
        {this.renderButton()}
      </View>
    )
  }
}