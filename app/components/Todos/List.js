import React, {Component, PropTypes} from 'react';
import {View, ListView, StyleSheet, Text} from 'react-native';

import Row from './Row';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class List extends Component {
  static propTypes = {
    list: PropTypes.array
  };

  static defaultProps = {
    list: []
  };

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  constructor(props) {
    super(props);

    this.state = {
      dataSource: this.ds.cloneWithRows(props.list),
      scroll: true
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: this.ds.cloneWithRows(props.list)
    });
  }

  onScroll = (scroll) => {
    this.setState({scroll});
  };

  renderRow = (data) => {
    return (
      <Row {...data} toggle={this.props.toggle} destroy={this.props.destroy} onScroll={this.onScroll} />
    );
  };

  render() {
    return (
      <ListView
        scrollEnabled={this.state.scroll}
        style={styles.container}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={this.renderRow}
      />
    );
  }
}
