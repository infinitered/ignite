import React, { TouchableOpacity, Text } from 'react-native'
import styles from '../Styles/NavigationStyle'

export default {

  forgotPasswordButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Text style={styles.navButtonText}>Forgot Password</Text>
      </TouchableOpacity>
    )
  }

}
