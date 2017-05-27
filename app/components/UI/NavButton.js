import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  text: {
    textAlign: 'center',
    lineHeight: 24
  }
});

export default function NavButton({ title, onPress, style, color, children }) {
  const content = title ? <Text style={[styles.text, style, { color }]}>{title}</Text> : children;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {content}
    </TouchableOpacity>
  )
}
