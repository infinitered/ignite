// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/AlertMessageStyle'
import { Metrics } from '../Themes/'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.add('Alert Message', () =>
  <View>
    <AlertMessage
      title='Alert Message with animation'
    />
    <AlertMessage
      title='Never see me'
      show={false}
    />
  </View>
)

type AlertMessageProps = {
  title: string,
  icon?: string,
  style?: Object,
  show?: bool
}

export default class AlertMessage extends React.Component {
  static defaultProps: { show: boolean }

  props: AlertMessageProps

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
