import React, { Component } from 'react';
import { connect } from 'react-redux';

import Questions from '../../components/Questions/Questions';
import { deleteQuestion } from '../../reducers/questions/list';

class QuestionsContainer extends Component {
  render() {
    return (
      <Questions {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    destroy: (id) => {
      dispatch(deleteQuestion(id));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsContainer);
