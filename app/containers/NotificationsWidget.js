import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotificationsWidget from '../components/NotificationsWidget';
import { closeNotification } from '../reducers/notifications';
import { navigate } from '../reducers/router';

class NotificationsWidgetContainer extends Component {
  render() {
    return (
      <NotificationsWidget {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose(notification) {
      dispatch(closeNotification(notification));
    },
    onPress(notification) {
      dispatch(navigate('Question', { id: notification.source_id }));
      dispatch(closeNotification(notification));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsWidgetContainer);
