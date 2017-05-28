import React, { PureComponent, PropTypes } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Notification from './Notification';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  }
});

export default class Questions extends PureComponent {
  static propTypes = {
    notifications: PropTypes.array
  };

  static defaultProps = {
    notifications: []
  };

  renderRow = ({ item }) => {
    return (
      <Notification
        notification={item}
        onClose={this.props.onClose}
        onPress={this.props.onPress}
      />
    )
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.notifications}
        enableEmptySections={true}
        keyExtractor={(item) => item.id}
        renderItem={this.renderRow}
      />
    );
  }
}
