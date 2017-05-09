import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, LayoutAnimation, Dimensions, TouchableHighlight } from 'react-native';
import { Router, Route, Container, Animations, Schema, Actions } from 'react-native-redux-router';

import { NavBar, NavBarModal } from './components/NavBar';
import Error from './components/Error';
import Home from './components/Home';
import Launch from './containers/Launch';
import Register from './components/Register';
import Login from './containers/Login';
import Todos from './containers/Todos/Todos';
import Questions from './containers/Questions/Questions';
import Question from './containers/Questions/Question';
import QuestionsForm from './containers/Questions/Form';
import Menu from './containers/Menu';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const { width } = Dimensions.get('window');

const MENU_WIDTH = 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(232,234,246,.25)'
  },
  menuWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 2
  },
  menu: {
    flex: 1,
    width: width * MENU_WIDTH,
  },
  menuRight: {
    flex: 1,
    width: width * (1 - MENU_WIDTH),
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0
  },
  view: {
    flex: 1,
    zIndex: 1
  }
});


class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    userRestore: PropTypes.func
  };

  state = {
    menuVisible: false
  };

  toggleMenu = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
      menuVisible: !this.state.menuVisible
    })
  };

  onQuestionAdd = {
    title: "Add",
    handler: () => {
      Actions.questions_add()
    }
  };

  onQuestionAddBack = {
    title: "Back",
    handler: () => {
      Actions.questions()
    }
  }

  render() {
    const styleMenu = {
      transform: [
        { translateX: this.state.menuVisible ? 0 : -1 * width }
      ]
    };

    const styleView = {
      transform: [
        {
          translateX: this.state.menuVisible ? width * MENU_WIDTH : 0
        }
      ]
    };

    return (
      <View style={styles.container}>
        <View style={[styles.menuWrapper, styleMenu]}>
          <View style={styles.menu}>
            <Menu user={this.props.user} toggleMenu={this.toggleMenu} />
          </View>
          <TouchableHighlight underlayColor="transparent" style={styles.menuRight} onPress={this.toggleMenu}>
            <View />
          </TouchableHighlight>
        </View>
        <View style={[styles.view, styleView]}>
          <Router ref={this.setRef}>
            <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal} />
            <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}
                    toggleMenu={this.toggleMenu} />
            <Schema name="withoutAnimation" navBar={NavBar} />
            <Schema name="tab" navBar={NavBar} />

            <Route name="launch" component={Launch} initial={true} title="Launch" />
            <Route name="register" component={Register} title="Register" />
            <Route name="home" component={Home} title="Home" type="replace" />
            <Route name="todos" component={Todos} title="Todos" type="replace" />
            <Route name="questions" component={Questions} title="Вопросы" type="replace"
                   rightButton={this.onQuestionAdd} />
            <Route name="question_show" component={Question} title="Вопрос" type="replace"
                   leftButton={this.onQuestionAddBack} />
            <Route name="questions_add" component={QuestionsForm} title="Создать вопрос" type="replace"
                   leftButton={this.onQuestionAddBack} />
            <Route name="login" component={Login} title="Login Page" />
            <Route name="register2" component={Register} myparam="abc" schema="withoutAnimation" />
            <Route name="error" component={Error} schema="popup" />
          </Router>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(App);
