import React, { Component } from 'react';
import { connect } from 'react-redux';

import Question from '../../components/Questions/Question';
import {
  toggleAdditionQuestion,
  changeQuestion,
  createAdditionQuestion,
  createAnswerQuestion
} from '../../reducers/questions/question';
import NavButton from '../../components/UI/NavButton';

class QuestionContainer extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const add = () => navigation.goBack();
    return {
      title: "Вопрос",
      headerLeft: <NavButton color={screenProps.tintColor} title="Назад" onPress={add} />,
    };
  };

  render() {
    return (
      <Question {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.questions.question,
    users: state.users,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAdditionQuestion: () => {
      dispatch(toggleAdditionQuestion())
    },
    changeAdditionText: (additionText) => {
      dispatch(changeQuestion({
        additionText
      }));
    },
    changeAnswerText: (answerText) => {
      dispatch(changeQuestion({
        answerText
      }));
    },
    createAdditionQuestion: () => {
      dispatch(createAdditionQuestion());
    },
    createAnswerQuestion: () => {
      dispatch(createAnswerQuestion())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
