import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Swipeout from 'react-native-swipe-out';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#e1e4e9',
    marginBottom: 10,
    borderRadius: 5
  },
  text: {
    fontSize: 16,
    color: '#474f60'
  },
  swipe: {
    flex: 1
  },
  btn: {
    padding: 12,
    paddingLeft: 6,
    paddingRight: 6,
    flex: 1,
    alignItems: 'flex-start',
    marginBottom: 10,
    borderRadius: 5,
    width: 65
  },
  btnText: {
    textAlign: 'center'
  }
});

export default class Row extends Component {
  onDestroy = () => {
    this.props.destroy(this.props.id);
  };

  onToggle = () => {
    this.props.toggle(this.props.id);
  };

  getBtn = (text, backgroundColor, position) => {
    const style = position === 'left' ? {marginLeft: 10} : {marginRight: 10};
    return (
      <View style={[styles.btn , {backgroundColor}, style]} underlayColor="transparent">
        <Text style={styles.btnText}>{text}</Text>
      </View>
    );
  };

  render() {
    const {text, completed} = this.props;
    const style = {
      color: completed ? '#999' : '#333'
    };

    const leftBtn = [{
      backgroundColor: 'transparent',
      component: this.getBtn(completed ? 'Undone' : 'Done', completed ? '#CDDC39' : '#8BC34A', 'left'),
      onPress: this.onToggle
    }];

    const rightBtn = [{
      text: 'Delete',
      backgroundColor: 'transparent',
      component: this.getBtn('Delete', '#F44336', 'right'),
      onPress: this.onDestroy
    }];

    return (
      <Swipeout left={leftBtn}
                right={rightBtn}
                autoClose={true}
                scroll={this.props.onScroll}
                backgroundColor='transparent'>
        <View style={styles.container}>
          <Text style={[styles.text , style]}>
            {text}
          </Text>
        </View>
      </Swipeout>
    );
  }
}
