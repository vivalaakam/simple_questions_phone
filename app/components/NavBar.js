import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from './Icon';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#474f60',
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
                          titleColor='white'
                          buttonsColor='white'
                          statusBar={{style:'light-content', hidden: false, tintColor: '#474f60'}}
                          title={{title:this.props.title, tintColor: '#e1e4e9'}}
                          prevTitle={this.props.initial ? " " : null}
                          leftButton={this.props.leftButton ? this.props.leftButton : {title:''}}
                          rightButton={this.props.rightButton ? this.props.rightButton : {title:''}}
    />
  }
}

export class NavBar extends Component {
  renderMenuButton(handler) {
    return (
      <TouchableHighlight onPress={handler} underlayColor="transparent">
        <View>
          <Icon name="Hamburger" fill="#e1e4e9" />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <NavBarBase
        customNext={<View/>}
        leftButton={this.renderMenuButton(this.props.toggleMenu)}
        {...this.props}
      />
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
