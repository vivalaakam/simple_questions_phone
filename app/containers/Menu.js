import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Actions } from 'react-native-redux-router';
import { userLogout } from '../reducers/user';

import Menu from '../components/Menu';

class MenuContainer extends Component {
  render() {
    return (
      <Menu {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    push(name, data) {
      return Actions.push({ name, data });
    },
    userLogout() {
      dispatch(userLogout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);