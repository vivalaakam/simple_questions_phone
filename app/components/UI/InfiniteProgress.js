import React, { PureComponent, PropTypes } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    marginHorizontal: 4,
    borderRadius: 4
  }
});

const indexes = [0.3, 1, 0.3];

export default class InfiniteProgress extends PureComponent {
  static propTypes = {
    color: PropTypes.string
  };

  static defaultProps = {
    color: '#e1e4e9'
  };

  animation = new Animated.Value(0);

  componentDidMount() {
    this.run()
  }

  run() {
    this.animation.setValue(0);
    Animated.timing(
      this.animation, {
        toValue: 1,
        duration: 750,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => this.run())
  }

  createAnimation(index) {
    const opacity = this.animation.interpolate({
      inputRange: Array.from({ length: 5 }).map(this.getPosition.bind(this, index)),
      outputRange: Array.from({ length: 5 }).map(this.getIndex.bind(this, index)),
      extrapolate: 'clamp'
    });

    return {
      opacity
    }
  }

  getPosition(i, skip, pos) {
    const curr = -7 + 10 * pos;
    return (curr + 2 * ((pos + (i * 2)) % 3)) / 30;
  };

  getIndex(i, skip, pos) {
    return indexes[(pos + (i * 2)) % 3]
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Animated.View style={[styles.dot, { backgroundColor: this.props.color }, this.createAnimation(0)]} />
        <Animated.View style={[styles.dot, { backgroundColor: this.props.color }, this.createAnimation(1)]} />
        <Animated.View style={[styles.dot, { backgroundColor: this.props.color }, this.createAnimation(2)]} />
      </View>
    );
  }
}
