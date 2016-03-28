import React, {Component, View, Navigator, StatusBar} from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import configureStore from './Store/Store'
import { Provider } from 'react-redux'
import Actions from './Actions/Creators'

// Styles
import styles from './Styles/RootStyle'

const PERSIST = true
const store = configureStore(PERSIST)

export default class RNBase extends Component {

  componentWillMount () {
    const { dispatch } = store
    dispatch(Actions.startup())
  }

  renderApp () {
    return (
      <Provider store={store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />

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
