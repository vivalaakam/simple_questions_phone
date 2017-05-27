import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Icon from '../Icon'
import NavButton from './NavButton'

export default class MenuButton extends PureComponent {
  render() {
    return (
      <NavButton onPress={this.props.toggleMenu}>
        <View>
          <Icon name="Hamburger" fill="#e1e4e9" />
        </View>
      </NavButton>
    )
  }
}
