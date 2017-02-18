import React, { Component, PropTypes } from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';

import Row from './Row';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});

export default class List extends Component {
  static propTypes = {
    list: PropTypes.array
  };

  static defaultProps = {
    list: []
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows(props.list),
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: this.ds.cloneWithRows(props.list)
    });
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        renderRow={(data) => <Row {...data} toggle={this.props.toggle} destroy={this.props.destroy} />}
      />
    );
  }
}
