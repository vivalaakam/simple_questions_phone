import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../UI/Button'
import TextInput from '../UI/TextInput'
import Container from '../UI/Container'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 18
  }
});

export default class QuestionsForm extends Component {
  handlePressSubmit = () => {
    this.props.createQuestion();
  };

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <TextInput
            first
            placeholder="Заголовок"
            multiline={true}
            onChangeText={this.props.questionFormTitle}
          />
          <TextInput
            last
            placeholder="Вопрос"
            multiline={true}
            onChangeText={this.props.questionFormText}
          />
        </Container>
        <Button title="Создать вопрос" onPress={this.handlePressSubmit} inProgress={this.props.app.question_create} />
      </View>
    );
  }
}
