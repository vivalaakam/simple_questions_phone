import React, { Component } from 'react';
import { connect } from 'react-redux';

import Questions from '../../components/Questions/Questions';
import NavButton from '../../components/UI/NavButton';
import { fetchQuestions } from '../../reducers/questions/list';
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
    users: state.users,
    app: state.app
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refresh() {
      dispatch(fetchQuestions())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsContainer);
