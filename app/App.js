import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Router, Route, Container, Animations, Schema } from 'react-native-redux-router';

import { NavBar, NavBarModal } from './components/NavBar';
import Error from './components/Error';
import Home from './components/Home';
import Launch from './containers/Launch';
import Register from './components/Register';
import Login from './containers/Login';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    userRestore: PropTypes.func
  };

  render() {
    const { user } = this.props;

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
          <Route name="login" component={Login} title="Login Page" />
          <Route name="register2" component={Register} myparam="abc" schema="withoutAnimation" />
          <Route name="error" component={Error} schema="popup" />
        </Router>
      </View>
    );
  }
}

export default connect(mapStateToProps)(App);