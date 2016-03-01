/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {Component, View, Navigator} from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'

// Styles
import styles from './Styles/RootStyle'

export default class RNBase extends Component {

  renderApp() {
    return (
      <View style={styles.applicationView}>
        <Navigator
          initialRoute={Routes.AllComponentsScreen}
          configureScene={Router.configureScene}
          renderScene={Router.renderScene}
          navigationBar={NavigationBar.render()}
          style={styles.container}
        />
      </View>
    )
  }

  render() {
    return this.renderApp()
  }
}
