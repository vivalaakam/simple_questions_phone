import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  main: {
    flex: 1
  },
  bottom: {
    flexBasis: 60
  }
});


export default class Menu extends Component {
  onPress = (action, data) => () => {
    console.log('onPress');
    this.props.push(action, data);
    this.props.toggleMenu();
  };

  renderLogout() {
    if (this.props.user) {
      return (
        <Button onPress={()=>this.props.userLogout()} title="Logout"></Button>
      );
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
          <Button onPress={this.onPress('launch')} title="Main"></Button>
          <Button onPress={this.onPress('todos')} title="Todos"></Button>
        </View>
        <View style={styles.bottom}>
          {this.renderLogout()}
        </View>
      </View>
    );
  }
}