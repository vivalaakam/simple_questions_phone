import React, { Component } from 'react';
import { connect } from 'react-redux';

import Settings from '../components/Settings';
import { userChange, userUpdate } from '../reducers/user';

class SettingsContainer extends Component {
  render() {
    return (
      <Settings {...this.props} />
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
    userLastName(tmp_last_name) {
      return dispatch(userChange({ tmp_last_name }));
    },
    userFirstName(tmp_first_name) {
      return dispatch(userChange({ tmp_first_name }));
    },
    updateUser() {
      return dispatch(userUpdate());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
