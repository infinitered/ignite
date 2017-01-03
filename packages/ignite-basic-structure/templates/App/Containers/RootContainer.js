// @flow

import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'

// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
      </View>
    )
  }
}

export default RootContainer
