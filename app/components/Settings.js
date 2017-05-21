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
  renderErrors() {
    const { user } = this.props;
    if (!user.wrongPassword && !user.smallPassword) {
      return null;
    }

    const errors = [];
    if (user.wrongPassword) {
      errors.push(<Text key="wrongPassword">Пароли не совпадают</Text>);
    }
    if (user.smallPassword) {
      errors.push(<Text key="smallPassword">Длинна пароля должна составлять не менее 8 символов</Text>);
    }

    return (
      <View className={styles.row}>
        {errors}
      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Сменить личные данные</Text>
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
        <Text>Сменить пароль</Text>
        <Text>Длинна пароля должна составлять не менее 8 символов</Text>
        <Container>
          <TextInput
            first
            secureTextEntry
            placeholder="Пароль"
            onChangeText={this.props.userPassword}
            value={this.props.user.password}
          />
          <TextInput
            last
            secureTextEntry
            placeholder="Повторите пароль"
            onChangeText={this.props.userPasswordConfirmation}
            value={this.props.user.password_confirmation}
          />
        </Container>
        {this.renderErrors()}
        <Button title="Сменить пароль" onPress={this.props.updatePasswordUser} />
      </View>
    );
  }
}
