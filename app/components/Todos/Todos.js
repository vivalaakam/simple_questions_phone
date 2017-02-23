import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Dimensions, Keyboard, Animated, TouchableHighlight} from 'react-native';

import Form from '../../containers/Todos/Form';
import List from './List';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    borderColor: 'gray', borderWidth: 1, height: 50
  },
  form: {
    position: 'absolute',
    bottom: 0,
    zIndex: 4,
    left: 0,
    right: 0
  },
  list: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 46
  },
  wrapper: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0
  }
});

export default class Todos extends Component {
  bottom = new Animated.Value(0);
  background = new Animated.Value(0);

  componentWillMount() {
    this.listener = Keyboard.addListener('keyboardWillChangeFrame', (props) => {
      const {endCoordinates, duration} = props;
      this.animate(height - endCoordinates.screenY, duration);
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  animate(toValue, duration) {
    Animated.parallel([
      Animated.timing(this.bottom, {toValue, duration}),
      Animated.timing(this.background, {toValue: toValue === 0 ? 0 : 1, duration})
    ]).start();
  }

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    const backgroundColor = this.background.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,.5)']
    });

    const zIndex = this.background.interpolate({
      inputRange: [0, 1],
      outputRange: [-1, 1]
    });

    return (
      <View style={styles.container}>
        <View style={[styles.list]}>
          <List list={this.props.todos} toggle={this.props.toggle} destroy={this.props.destroy} />
        </View>
        <Animated.View style={[styles.wrapper ,  {backgroundColor , zIndex }]}>
          <TouchableHighlight style={{flex:1}} underlayColor="transparent" onPress={this.dismissKeyboard}>
            <View style={{flex:1}} />
          </TouchableHighlight>
        </Animated.View>
        <Animated.View style={[styles.form , {bottom: this.bottom}]}>
          <Form />
        </Animated.View>
      </View>
    )
  }
}