import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Container from './UI/Container';
import TextInput from './UI/TextInput';
import Button from './UI/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F5FCFF'
  }
});


export default class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Container>
          <TextInput
            first
            placeholder="Имя"
            onChangeText={this.props.userFirstName}
            value={this.props.user.tmp_first_name}
          />
          <TextInput
            last
            placeholder="Фамилия"
            onChangeText={this.props.userLastName}
            value={this.props.user.tmp_last_name}
          />
        </Container>
        <Button title="Обновить" onPress={this.props.updateUser} />
      </View>
    );
  }
}
