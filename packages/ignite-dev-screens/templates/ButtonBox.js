import React, { PropTypes } from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import styles from './Styles/ButtonBoxStyles'

export default class ButtonBox extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    image: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    text: PropTypes.string
  }

  render () {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
        <Image resizeMode='contain' source={this.props.image} style={styles.image} />
        <Text style={styles.label}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}
