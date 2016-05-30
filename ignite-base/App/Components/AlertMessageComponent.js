import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/AlertMessageComponentStyle'
import * as Animatable from 'react-native-animatable'
import I18n from '../I18n/I18n.js'
import { Metrics } from '../Themes/'
import Icon from 'react-native-vector-icons/Ionicons'

import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.add('Alert Message', () =>
  <AlertMessage
    title='Alert Message with animation'
  />
)

export default class AlertMessage extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    title: React.PropTypes.string,
    icon: React.PropTypes.string
  }

  render () {
    const { title } = this.props
    const defMessage = I18n.t('noItems')
    return (
      <Animatable.View
        style={[styles.container, this.props.style]}
        delay={800}
        animation='bounceIn'
      >
        <View style={styles.contentContainer}>
          <Icon
            name={this.props.icon || 'ios-alert'}
            size={Metrics.icons.large}
            style={styles.icon}
          />
          <Text allowFontScaling={false} style={styles.message}>{title ? title.toUpperCase() : defMessage.toUpperCase()}</Text>
        </View>
      </Animatable.View>
    )
  }
}
