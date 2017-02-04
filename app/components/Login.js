import { LoginButton, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  },
});

export default class Login extends Component {
  onLoginFinished = (error, result) => {
    if (error) {
      alert("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
          alert(data.accessToken.toString())
        }
      )
    }
  };

  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log(result);
    }
  };

  getData(token) {
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: token,
        parameters: {
          fields: {
            string: 'id,email,name,first_name,middle_name,last_name' // what you want to get
          }
        }
      },
      this._responseInfoCallback,
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  }

  componentDidMount() {
    AccessToken.getCurrentAccessToken().then((data) => {
      this.getData(data.accessToken.toString())
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={this.onLoginFinished}
          onLogoutFinished={() => alert("logout.")} />
      </View>
    );
  }
}
