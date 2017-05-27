import React, { Component } from 'react';
import { connect } from 'react-redux';

import Questions from '../../components/Questions/Questions';
import NavButton from '../../components/UI/NavButton';
import { deleteQuestion } from '../../reducers/questions/list';
import MenuButton from '../MenuButton';

class QuestionsContainer extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const add = () => navigation.navigate('QuestionsForm');
    return {
      title: "Вопросы",
      headerRight: <NavButton color={screenProps.tintColor} title="Добавить" onPress={add} />,
      headerLeft: <MenuButton />
    };
  };

  render() {
    return (
      <Questions {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.list,
    users: state.users
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
