import React, { Component } from 'react';
import { connect } from 'react-redux';

import Launch from '../components/Launch';
import { userLogout } from '../reducers/user';

class LaunchContainer extends Component {
  render() {
    return (
      <Launch {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout() {
      dispatch(userLogout());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchContainer);