import React, { Component, PropTypes } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './Styles/DrawerButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.addComponentExample('Drawer Button', () =>
  <DrawerButton
    text='Example left drawer button'
    onPress={() => window.alert('Your drawers are showing')}
  />
)

class DrawerButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func
  }

  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

export default DrawerButton
