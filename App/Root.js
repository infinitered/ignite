import React, {Component, View, Navigator} from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import configureStore from './Store/Store'
import { Provider } from 'react-redux'

// Styles
import styles from './Styles/RootStyle'

const store = configureStore()

export default class RNBase extends Component {

  renderApp () {
    return (
      <Provider store={store}>
        <View style={styles.applicationView}>
          <Navigator
            initialRoute={Routes.AllComponentsScreen}
            configureScene={Router.configureScene}
            renderScene={Router.renderScene}
            navigationBar={NavigationBar.render()}
            style={styles.container}
          />
        </View>
      </Provider>
    )
  }

  render () {
    return this.renderApp()
  }
}
