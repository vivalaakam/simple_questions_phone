import React, { PureComponent, PropTypes } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import QuestionRow from './QuestionRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  }
});

export default class Questions extends PureComponent {
  static propTypes = {
    questions: PropTypes.array
  };

  static defaultProps = {
    questions: []
  };

  renderRow = ({ item }) => {
    return (
      <QuestionRow question={item} user={this.props.users[item.user_id]} navigation={this.props.navigation} />
    );
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.questions}
        enableEmptySections={true}
        keyExtractor={(item) => item.id}
        renderItem={this.renderRow}
      />
    );
  }
}
