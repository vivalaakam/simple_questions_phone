import React, { PureComponent, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
import InfiniteProgress from './InfiniteProgress';

export const styles = StyleSheet.create({
  container: {
    flexBasis: 40,
    backgroundColor: '#474f60',
    padding: 8,
    borderRadius: 5,
    overflow: 'hidden'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24,
    color: '#fff',
  }
});

export default class Button extends PureComponent {
  static propTypes = {
    inProgress: PropTypes.bool,
    title: PropTypes.string
  };

  static defaultProps = {
    inProgress: false
  };

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    const { title, onPress, style, inProgress } = this.props;

    if (inProgress) {
      return (
        <View style={[styles.container, { height: 40 }, style]}>
          <InfiniteProgress  />
        </View>
      )
    }

    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.container, styles.textStyle, style]}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}
