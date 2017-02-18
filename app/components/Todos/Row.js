import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipe-out';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  swipe: {
    flex: 1
  }
});

export default class Row extends Component {
  render() {
    const { text, completed } = this.props;
    const style = {
      color: completed ? '#999' : '#333'
    };

    const leftBtn = [{
      text: completed ? 'Undone' : 'Done',
      backgroundColor: completed ? 'yellow' : 'green',
      onPress: () => {
        this.props.toggle(this.props.id);
      }
    }];

    const rightBtn = [{
      text: 'Delete',
      backgroundColor: 'tomato',
      onPress: () => {
        this.props.destroy(this.props.id);
      }
    }];

    return (
      <Swipeout left={leftBtn}
                right={rightBtn}
                autoClose={true}
                backgroundColor='transparent'>
        <View style={styles.container}>
          <Text style={[styles.text , style]}>
            {text}
          </Text>
        </View>
      </Swipeout>
    );
  }
}
