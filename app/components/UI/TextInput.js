import React from 'react'
import { TextInput as OriginalTextInput, StyleSheet, Animated } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexBasis: 40,
    fontSize: 18,
    lineHeight: 24,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(121,135,142,.77)'
  },
  first: {
    marginTop: -8,
  },
  last: {
    marginBottom: -8,
    borderBottomWidth: 0
  }
});

const AnimatedTextInput = Animated.createAnimatedComponent(OriginalTextInput);

export default function TextInput({ style, first, last, ...props }) {
  const flexBasis = new Animated.Value(40);
  const elStyle = [styles.container, style, { flexBasis }];

  if (first) {
    elStyle.push(styles.first);
  }

  if (last) {
    elStyle.push(styles.last);
  }

  const onChange = props.multiline ? (e) => {
      flexBasis.setValue(e.nativeEvent.contentSize.height);
    } : null;

  return (
    <AnimatedTextInput style={elStyle} onChange={onChange} {...props} />
  )
}
