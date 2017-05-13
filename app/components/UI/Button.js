import React from 'react'
import { Text, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexBasis: 40,
    color: '#fff',
    backgroundColor: '#474f60',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24,
    padding: 8,
    borderRadius: 5,
    overflow: 'hidden'
  }
})

export default function Button({ title, onPress, style }) {
  return (
    <Text {...{ onPress }} style={[styles.container, style]}>
      {title}
    </Text>
  )
}
