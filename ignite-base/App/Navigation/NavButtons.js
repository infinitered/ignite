import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/NavigationStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes'

// I18n
import I18n from '../I18n/I18n.js'

export default {

  backButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Icon name='angle-left'
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Icon name='bars'
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  forgotPasswordButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Text style={styles.navButtonText}>{I18n.t('forgotPassword')}</Text>
      </TouchableOpacity>
    )
  }

}
