import React, { Component } from 'react';
import { connect } from 'react-redux';

import Settings from '../components/Settings';
import { userChange, userUpdate, userPasswordUpdate, userTokenRemove, userNotificationRemove } from '../reducers/user';

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
    },
    userPassword(password) {
      return dispatch(userChange({ password }))
    },
    userPasswordConfirmation(password_confirmation) {
      return dispatch(userChange({ password_confirmation }))
    },
    updatePasswordUser() {
      return dispatch(userPasswordUpdate());
    },
    userTokenRemove() {
      return dispatch(userTokenRemove());
    },
    userNotificationRemove() {
      return dispatch(userNotificationRemove());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
