import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
    marginBottom: 8,
    borderColor: 'rgba(121,135,142,.77)',
    borderWidth: 1,
    shadowColor: '#607D8B',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8
  }
})

export default function Container({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}
