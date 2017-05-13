import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-redux-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474f60'
  },
  main: {
    flex: 1,
    paddingTop: 25
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
    if (this.props.user && this.props.user.auth) {
      return this.renderButton('Выход', () => {
        this.props.userLogout();
        this.props.toggleMenu();
      });
    }

    return this.renderButton('Вход', () => {
      Actions.login();
      this.props.toggleMenu();
    });
  }

  renderSettings() {
    if (this.props.user && this.props.user.auth) {
      return this.renderButton('Настройки', this.onPress('settings'))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {this.renderButton('Вопросы', this.onPress('questions'))}
          {this.renderSettings()}
        </View>
        <View style={styles.bottom}>
          {this.renderLogout()}
        </View>
      </View>
    );
  }
}
