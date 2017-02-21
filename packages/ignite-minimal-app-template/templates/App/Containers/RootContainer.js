// @flow

import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'

// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <View style={styles.container}>
          <Text>Find me in App/Containers/RootContainer.js</Text>
        </View>
      </View>
    )
  }
}

export default RootContainer
