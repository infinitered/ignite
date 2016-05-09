import React from 'react'
import { Navigator } from 'react-native'
import NavigationBarRouteMapper from './NavigationBarRouteMapper'

// Stylesheet
import styles from './Styles/NavigationStyle'

export default {
  render () {
    return (
      <Navigator.NavigationBar
        navigationStyles={Navigator.NavigationBar.StylesIOS}
        routeMapper={NavigationBarRouteMapper}
        style={styles.navigationBar}
      />
    )
  }
}
