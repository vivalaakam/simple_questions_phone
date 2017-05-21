import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import Container from './UI/Container';
import TextInput from './UI/TextInput';
import Button from './UI/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontWeight: '500',
    marginBottom: 8
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

  renderSessions() {
    const { user } = this.props;
    if (!(user.tokens && user.tokens.length)) {
      return null;
    }

    return user.tokens.map((token) => {
      const onClickRemove = () => {
        this.props.userTokenRemove(token);
      };

      const notification = () => {
        if (!token.has_notification) {
          return null;
        }

        const onClickNotification = () => {
          this.props.userNotificationRemove(token);
        };

        return (
          <Button onPress={onClickNotification} title="Отключить уведомления" />
        );
      };

      return (
        <View key={token.id} style={{ marginBottom: 8 }}>
          <Container>
            <Text>{token.user_agent}</Text>
          </Container>
          {notification()}
          <Button onPress={onClickRemove} title="Удалить сессию" />
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Сменить личные данные</Text>
        <Container>
          <TextInput
            first
            placeholder="Имя"
            style={{height: 40}}
            onChangeText={this.props.userFirstName}
            value={this.props.user.tmp_first_name}
          />
          <TextInput
            last
            placeholder="Фамилия"
            style={{height: 40}}
            onChangeText={this.props.userLastName}
            value={this.props.user.tmp_last_name}
          />
        </Container>
        <Button style={{ marginBottom: 8 }} title="Обновить" onPress={this.props.updateUser} />
        <Text style={styles.title}>Сменить пароль</Text>
        <Text style={{ marginBottom: 8 }}>Длинна пароля должна составлять не менее 8 символов</Text>
        <Container>
          <TextInput
            first
            secureTextEntry
            placeholder="Пароль"
            style={{height: 40}}
            onChangeText={this.props.userPassword}
            value={this.props.user.password}
          />
          <TextInput
            last
            secureTextEntry
            placeholder="Повторите пароль"
            style={{height: 40}}
            onChangeText={this.props.userPasswordConfirmation}
            value={this.props.user.password_confirmation}
          />
        </Container>
        {this.renderErrors()}
        <Button style={{ marginBottom: 8 }} title="Сменить пароль" onPress={this.props.updatePasswordUser} />
        <Text style={styles.title}>Активные сессии</Text>
        {this.renderSessions()}
      </ScrollView>
    );
  }
}
