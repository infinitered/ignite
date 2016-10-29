// @flow

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/FullButtonStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.add('Full Button', () =>
  <FullButton
    text='Hey there'
    onPress={() => window.alert('Full Button Pressed!')}
  />
)

type FullButtonProps = {
  text: string,
  onPress: () => void,
  styles?: Object
}

export default class FullButton extends React.Component {
  props: FullButtonProps

  render () {
    return (
      <TouchableOpacity style={[styles.button, this.props.styles]} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text && this.props.text.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}
