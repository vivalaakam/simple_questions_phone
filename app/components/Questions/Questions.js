import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import QuestionRow from './QuestionRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  }
});

export default class Questions extends Component {
  static propTypes = {
    questions: PropTypes.array
  };

  static defaultProps = {
    questions: []
  };

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  constructor(props) {
    super(props);

    this.state = {
      dataSource: this.ds.cloneWithRows(props.questions),
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: this.ds.cloneWithRows(props.questions)
    });
  }

  renderRow = (data) => {
    return (
      <QuestionRow question={data} />
    );
  };

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={this.renderRow}
      />
    );
  }
}
