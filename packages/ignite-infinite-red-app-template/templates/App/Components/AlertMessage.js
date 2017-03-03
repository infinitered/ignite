import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/AlertMessageStyles'

export default class AlertMessage extends React.Component {
  static defaultProps = { show: true }

  props = {
    title: "",
    icon: null,
    style: {},
    show: true
  }

  render () {
    let messageComponent = null
    if (this.props.show) {
      const { title } = this.props
      return (
        <View
          style={[styles.container, this.props.style]}
        >
          <View style={styles.contentContainer}>
            <Text allowFontScaling={false} style={styles.message}>{title && title.toUpperCase()}</Text>
          </View>
        </View>
      )
    }

    return messageComponent
  }
}

AlertMessage.defaultProps = {
  show: true
}
