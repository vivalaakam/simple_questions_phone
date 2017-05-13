import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Actions } from 'react-native-redux-router';
import { userLogout } from '../reducers/user';
import { toggleAppMenu } from '../reducers/app';

import Menu from '../components/Menu';

class MenuContainer extends Component {
  render() {
    return (
      <Menu {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    push(name, data) {
      return Actions.replace({ name, data });
    },
    userLogout() {
      return dispatch(userLogout());
    },
    toggleMenu() {
      return dispatch(toggleAppMenu())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
