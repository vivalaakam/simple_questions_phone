import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import NavButton from '../../components/UI/NavButton';

import Form from '../../components/Questions/Form';
import { createQuestion, changeQuestion } from '../../reducers/questions/question';

class QuestionsFormContainer extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const add = () => navigation.goBack();
    return {
      title: "Создать вопрос",
      headerLeft: <NavButton color={screenProps.tintColor} title="Назад" onPress={add} />,
    };
  };

  static propTypes = {
    form: PropTypes.object,
    createTodo: PropTypes.func,
    todoFormText: PropTypes.func
  };

  render() {
    return (
      <Form {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.questions.question
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createQuestion(params) {
      return dispatch(createQuestion(params));
    },
    questionFormText(text) {
      return dispatch(changeQuestion({ text }));
    },
    questionFormTitle(title) {
      return dispatch(changeQuestion({ title }));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsFormContainer);
