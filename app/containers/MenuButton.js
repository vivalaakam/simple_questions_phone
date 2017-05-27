import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleAppMenu } from '../reducers/app';

import MenuButton from '../components/UI/MenuButton';

class MenuButtonContainer extends Component {
  render() {
    return (
      <MenuButton {...this.props} />
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenu() {
      return dispatch(toggleAppMenu())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuButtonContainer);
