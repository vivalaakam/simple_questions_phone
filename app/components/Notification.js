import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Interactable from 'react-native-interactable';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: 'rgba(255,255,255,.7)',
    borderRadius: 5,
    marginTop: 8,
    paddingVertical: 8,
    height: 72
  },
  notificationHeader: {
    paddingHorizontal: 8,
    marginBottom: 8
  },
  notificationTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333'
  },
  notificationBody: {
    fontSize: 13,
    fontWeight: '300',
    color: '#333',
    paddingHorizontal: 8
  }
});

export default class Notification extends PureComponent {
  onPress = () => {
    this.props.onPress(this.props.notification);
  };

  onSnap = (e) => {
    if (e.nativeEvent.id === 'closed') {
      this.props.onClose(this.props.notification);
    }
  };

  render() {
    const { notification } = this.props;
    return (
      <Interactable.View
        horizontalOnly={true}
        snapPoints={[
          { x: 0, damping: 0.2, id: 'opened' },
          { x: width, id: 'closed' }
        ]}
        onSnap={this.onSnap}
      >
        <TouchableOpacity style={styles.notificationContainer} onPress={this.onPress}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
          </View>
          <Text numberOfLines={2} style={styles.notificationBody}>{notification.body}</Text>
        </TouchableOpacity>
      </Interactable.View>
    );
  }
}
