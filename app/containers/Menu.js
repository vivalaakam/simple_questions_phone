import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userLogout } from '../reducers/user';
import { toggleAppMenu } from '../reducers/app';
import { navigate } from '../reducers/router';

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
    push(routeName, params) {
      return dispatch(navigate(routeName, params))
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
