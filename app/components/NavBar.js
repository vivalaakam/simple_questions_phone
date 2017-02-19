import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from './Icon';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#333',
  },
});

export default class NavBarBase extends Component {
  onPrev() {
    const Actions = this.props.routes;
    if (this.props.onPrev) {
      this.props.onPrev();
      return;
    }
    if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
      Actions.pop();
    }
  }

  render() {
    return <NavigationBar style={styles.navBar}
      //titleColor='white'
      // buttonsColor='white'
                          statusBar={{style:'default', hidden: false, tintColor: '#333'}}
                          title={{title:this.props.title}}
                          prevTitle={this.props.initial ? " " : null}
                          leftButton={this.props.leftButton ? this.props.leftButton : {title:''}}
                          rightButton={this.props.rightButton ? this.props.rightButton : {title:''}}
    />
  }
}

export class NavBar extends Component {
  renderButton(handler) {
    return (
      <View>
        <TouchableHighlight onPress={handler} underlayColor="transparent">
          <View>
            <Icon name="Hamburger" fill="#eee" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <NavBarBase customNext={<View/>} leftButton={this.renderButton(this.props.toggleMenu)} {...this.props} />
    );
  }
}


export class NavBarModal extends Component {
  render() {
    const Actions = this.props.routes;
    return <NavBarBase customPrev={<View/>} nextTitle="Close" {...this.props}
                       rightButton={{title:'Close', handler:this.props.onNext || Actions.pop}} />
  }
}