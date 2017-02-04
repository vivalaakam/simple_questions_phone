import React, { Component } from 'react';
import { View } from 'react-native';
import { Router, Route, Container, Animations, Schema } from 'react-native-redux-router';

import { NavBar, NavBarModal } from './components/NavBar';
import Error from './components/Error';
import Home from './components/Home';
import Launch from './components/Launch';
import Register from './components/Register';
import Login from './components/Login';

export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}} />
        <Router>
          <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal} />
          <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar} />
          <Schema name="withoutAnimation" navBar={NavBar} />
          <Schema name="tab" navBar={NavBar} />

          <Route name="launch" component={Launch} initial={true} hideNavBar={true} title="Launch" />
          <Route name="register" component={Register} title="Register" />
          <Route name="home" component={Home} title="Home" type="replace" />
          <Route name="login" component={Login} schema="modal" />
          <Route name="register2" component={Register} myparam="abc" schema="withoutAnimation" />
          <Route name="error" component={Error} schema="popup" />
        </Router>
      </View>
    );
  }
}