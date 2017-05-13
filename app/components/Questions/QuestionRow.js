import React from 'react';
import moment from 'moment';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-redux-router';

import Container from '../UI/Container'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: '300',
    fontSize: 13,
    lineHeight: 15,
    color: '#5E6066'
  },
  title: {
    fontWeight: '500'
  },
  show: {
    flex: 1,
    borderTopColor: '#607D8B',
    borderTopWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8
  },
  showText: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 15
  }
});

export default function QuestionRow({ question, user = {} }) {
  const time = moment(question.created_at).fromNow();

  const showQuestion = () => {
    Actions.question_show({ id: question.id })
  };

  return (
    <Container>
      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.text}>{time}</Text>
      <Text style={[styles.text, styles.title]}>{question.title}</Text>
      <Text style={styles.text}>{question.text}</Text>
      <TouchableOpacity style={[styles.show]} onPress={showQuestion}>
        <Text style={[styles.showText]}>Подробнее</Text>
      </TouchableOpacity>
    </Container>
  )
}
