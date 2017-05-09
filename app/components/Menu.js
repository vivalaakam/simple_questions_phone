import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474f60'
  },
  main: {
    flex: 1
  },
  bottom: {
    flexBasis: 60
  },
  btn: {
    flexBasis: 44,
    padding: 20,
    paddingRight: 25,
    borderBottomColor: '#e1e4e9'
  },
  btnText: {
    color: '#e1e4e9'
  }
});


export default class Menu extends Component {
  onPress = (action, data) => () => {
    this.props.push(action, data);
    this.props.toggleMenu();
  };

  renderButton(title, action) {
    return (
      <TouchableHighlight onPress={action} underlayColor="transparent">
        <View style={styles.btn}>
          <Text style={styles.btnText}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderLogout() {
    if (this.props.user) {
      return this.renderButton('Logout', this.props.userLogout);
    }

    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text>
            Menu
          </Text>
          {this.renderButton('Main', this.onPress('launch'))}
          {this.renderButton('Todos', this.onPress('todos'))}
          {this.renderButton('Questions', this.onPress('questions'))}
        </View>
        <View style={styles.bottom}>
          {this.renderLogout()}
        </View>
      </View>
    );
  }
}