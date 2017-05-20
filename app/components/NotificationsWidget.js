import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Platform, StatusBar } from 'react-native';
import Interactable from 'react-native-interactable';

import Notification from './Notification';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  panelContainer: {
    zIndex: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70
  },
  panel: {
    height: height + 2,
    backgroundColor: '#474f60f0',
    padding: 5,
    paddingTop: 30,
    flexDirection: 'column-reverse'
  },
  panelFooterIos: {
    flexBasis: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  panelFooterAndroid: {
    flexBasis: 10,
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff80'
  }
});

export default class NotificationsWidget extends PureComponent {
  renderNotifications(notifications) {
    return notifications.map((notification) => {
      return (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={this.props.onClose}
          onPress={this.props.onPress}
        />
      )
    })
  }

  render() {
    const { notifications } = this.props;
    const elements = notifications.filter(notification => notification.is_new);

    if (elements.length === 0) {
      return null;
    }

    return (
      <View style={styles.panelContainer}>
        <StatusBar hidden={true} />
        <Interactable.View
          verticalOnly={true}
          snapPoints={[{ y: 0, tension: 0, damping: 1 }, { y: -height + 90 }]}
          gravityPoints={[{
            y: 0,
            strength: 220,
            falloff: height * 8,
            damping: 0.7,
            influenceArea: { top: (-height + 90) * 0.5 }
          }]}
          initialPosition={{ y: -height + 90 }}
          boundaries={{ top: -height, bottom: 0, bounce: 2, haptics: true }}>
          <View style={styles.panel}>
            <View style={(Platform.OS === 'android') ? styles.panelFooterAndroid : styles.panelFooterIos }>
              <View style={styles.panelHandle} />
            </View>
            {this.renderNotifications(elements)}
          </View>
        </Interactable.View>
      </View>
    )
  }
}
