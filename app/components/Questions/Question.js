import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Container from '../UI/Container';
import Button from '../UI/Button';
import TextInput from '../UI/TextInput';
import pluralize from '../../utils/pluralize';

moment.locale('ru');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 18
  },
  text: {
    fontWeight: '300',
    fontSize: 13,
    lineHeight: 15,
    color: '#5E6066'
  },
  title: {
    fontWeight: '500',
    fontSize: 25,
    lineHeight: 28,
    color: '#5E6066'
  },
  addition: {
    marginBottom: 8
  },
  createAddition: {
    marginBottom: 8
  }
});

export default class Question extends Component {
  renderAdditionButton() {
    const { user, question } = this.props;

    if (question.user_id !== user.id || question.addition) {
      return null;
    }

    return (
      <Button onPress={this.props.toggleAdditionQuestion} title="Дополнить вопрос" />
    );
  }

  renderAdditionForm() {
    const { question } = this.props;

    if (!question.addition) {
      return null;
    }

    return (
      <View>
        <Container>
          <TextInput
            first
            last
            name="additionText"
            value={question.additionText}
            onChangeText={this.props.changeAdditionText}
            placeholder="Дополнить вопрос"
            style={{ height: 40 }}
          />
        </Container>
        <Button onPress={this.props.createAdditionQuestion} style={styles.createAddition} title="Дополнить вопрос" />
        <Button onPress={this.props.toggleAdditionQuestion} title="Отмена" />
      </View>
    );
  }

  renderAdditions() {
    const { question } = this.props;

    if (!question.additions) {
      return null;
    }

    return question.additions.map((addition, index) => (
      <View key={addition.id} style={styles.addition}>
        <Text style={styles.text}>Дополнение #{index + 1}: {moment(addition.created_at).fromNow()}</Text>
        <Text style={styles.text}>{addition.text}</Text>
      </View>
    ));
  }

  renderCommentTitle() {
    const { question } = this.props;
    if (!(question.answers && question.answers.length)) {
      return (
        <Text style={[styles.title]}>Пока нет ответов на вопрос</Text>
      );
    }

    const length = question.answers.length;

    const count = pluralize(length, ['ответ', 'ответа', 'ответов']);

    return (
      <Text style={[styles.title]}>{question.answers.length} {count} на вопрос</Text>
    );
  }

  renderComments() {
    const { question } = this.props;

    if (!question.answers) {
      return null
    }

    return question.answers.map((answer) => {
      const user = this.props.users[answer.user_id] || {};
      return (
        <Container key={answer.id}>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.text}>{moment(answer.created_at).fromNow()}</Text>
          <Text style={styles.text}>{answer.text}</Text>
        </Container>
      )
    });
  }

  renderCommentForm() {
    const { user, question } = this.props;
    if (!user.id || user.id === question.user_id) {
      return null;
    }

    return (
      <View>
        <Container>
          <TextInput
            first
            last
            name="answerText"
            value={question.answerText}
            onChangeText={this.props.changeAnswerText}
            placeholder="Ответ на вопрос"
            style={{ height: 40 }}
          />
        </Container>
        <Button onPress={this.props.createAnswerQuestion} title="Ответить на вопрос" />
      </View>
    );
  }

  render() {
    const { question } = this.props;
    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.title]}>{question.title}</Text>
        <Container>
          <Text style={styles.text}>{question.text}</Text>
          {this.renderAdditions()}
        </Container>
        {this.renderAdditionForm()}
        {this.renderAdditionButton()}
        {this.renderCommentTitle()}
        {this.renderComments()}
        {this.renderCommentForm()}
      </ScrollView>
    );
  }
}
