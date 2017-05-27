import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, LayoutAnimation, Dimensions, TouchableHighlight, StatusBar } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

import Navigator from './Navigator'
import Menu from './containers/Menu';
import NotificationsWidget from './containers/NotificationsWidget'
import { toggleAppMenu } from './reducers/app';

const { width } = Dimensions.get('window');

const MENU_WIDTH = 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(232,234,246,.25)'
  },
  menuWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 2
  },
  menu: {
    flex: 1,
    width: width * MENU_WIDTH,
  },
  menuRight: {
    flex: 1,
    width: width * (1 - MENU_WIDTH),
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0
  },
  view: {
    flex: 1,
    zIndex: 1
  }
});


class App extends Component {
  static propTypes = {
    userRestore: PropTypes.func
  };

  toggleMenu = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.props.toggleMenu();
  };

  render() {
    const styleMenu = {
      transform: [
        { translateX: this.props.app.menu ? 0 : -1 * width }
      ]
    };

    const styleView = {
      transform: [
        {
          translateX: this.props.app.menu ? width * MENU_WIDTH : 0
        }
      ]
    };

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <NotificationsWidget />
        <View style={[styles.menuWrapper, styleMenu]}>
          <View style={styles.menu}>
            <Menu toggleMenu={this.toggleMenu} />
          </View>
          <TouchableHighlight underlayColor="transparent" style={styles.menuRight} onPress={this.toggleMenu}>
            <View />
          </TouchableHighlight>
        </View>
        <View style={[styles.view, styleView]}>
          <Navigator screenProps={{ tintColor: '#e1e4e9' }} navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.router,
          })} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    router: state.router
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenu() {
      return dispatch(toggleAppMenu())
    },
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
