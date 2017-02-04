import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationBar from 'react-native-navbar';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#0db0d9'
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
    console.log("Props : " + this.props);
    return <NavigationBar style={styles.navBar}
                          titleColor='white'
                          buttonsColor='white'
                          statusBar={{style:'light-content', hidden: false}}
                          title={{title:this.props.title}}
                          prevTitle={this.props.initial ? " " : null}
                          leftButton={this.props.leftButton ? this.props.leftButton : {title:''}}
                          rightButton={this.props.rightButton ? this.props.rightButton : {title:''}}
    />
  }
}

export class NavBar extends Component {
  render() {
    const Actions = this.props.routes;
    return <NavBarBase customNext={<View/>} {...this.props}
                       leftButton={{title:'Left', handler:this.props.onPrev || Actions.pop}} />
  }
}


export class NavBarModal extends Component {
  render() {
    const Actions = this.props.routes;
    return <NavBarBase customPrev={<View/>} nextTitle="Close" {...this.props}
                       rightButton={{title:'Close', handler:this.props.onNext || Actions.pop}} />
  }
}