import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notifications from '../components/Notifications';
import { closeNotification } from '../reducers/notifications';
import navigate from '../reducers/navigate';
import MenuButton from './MenuButton';

class NotificationsContainer extends Component {
  static navigationOptions = {
    title: "Уведомления",
    headerLeft: <MenuButton />
  };

  render() {
    return (
      <Notifications {...this.props} />
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
