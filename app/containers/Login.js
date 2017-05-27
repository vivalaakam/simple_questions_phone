import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../components/Login';
import MenuButton from './MenuButton'

import { userTryAuth, userChange, userAuth } from '../reducers/user';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin(params) {
      dispatch(userTryAuth(params));
    },
    userAuthEmail(email) {
      return dispatch(userChange({ email }));
    },
    userAuthPassword(password) {
      return dispatch(userChange({ password }));
    },
    userAuth() {
      return dispatch(userAuth())
    }
  }
};

class LoginContainer extends Component {
  static navigationOptions = {
    title: "Вход",
    headerLeft: <MenuButton />
  };

  render() {
    return <Login {...this.props} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
