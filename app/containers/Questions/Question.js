import React, { Component } from 'react';
import { connect } from 'react-redux';

import Question from '../../components/Questions/Question';
import {
  toggleAdditionQuestion,
  changeQuestion,
  createAdditionQuestion,
  createAnswerQuestion
} from '../../reducers/questions/question';

class QuestionContainer extends Component {
  render() {
    return (
      <Question {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  console.log(this.state);
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
