import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import DrawerWrapper from './DrawerWrapper'
// import NavBarWithBack from './NavBarWithBack'
// import { connect } from 'react-redux'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
import LoginScreen from '../Containers/LoginScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'

/**
 * Gives an opportunity to style the container based on the
 * scene.  Currently we use this only to display the navbar
 * or not.
 */
const getSceneStyle = (props, computedProps) => {
  const styles = Styles.container
  if (computedProps.isActive) {
    styles.marginTop = computedProps.hideNavBar ? 0 : 64
  } else {
    styles.marginTop = 0
  }
  return styles
}

/**
 * This is the router.  You define Scenes (which are screens). Scenes
 * have properties which alter the navigation flow.  For example, some
 * scenes have can hide the nav bar.
 *
 * Some scenes are simply wrappers.  Like root.  This only exists to
 * ensure that the navbar and tabbar (not used in this project) are
 * hidden.
 *
 * Some scenes are actually tab containers and they are given their own
 * StackReducer behind the scenes (you don't need to know this, but
 * whatever).
 *
 * Another thing to wrap your head around is that these scenes may
 * look like a typical react component hierarchy but they're not.  This
 * is just configuration.  No screens get created, and the order is not
 * important (although the hierarchy depth is).
 *
 * For example, it's important that the home screen lives under the tabHome
 * scene. You don't want nesting unless you want to limit which screens you
 * can navigate to. Each separate level represents a brand new stack. This
 * is probably NOT what you want (or expect).
 *
 * Not all Scenes have components!  How's that for a mind fuck.
 *
 * I really like react-native-router-flux, however, for this project, the
 * customizations required make us butcher its functionality just a little
 * bit.
 *
 * For example, we have the concept of tabs, but it's more of a nav bar.
 * And it changes.  This is not how typical apps work.  So... we have to
 * pass our own navBar around.
 *
 * In truth we might have to unhook that and roll it custom too because
 * of the flicker when we change pages.
 *
 * It's a good start around the travesty that is React Native navigation.
 */

// const RouterWithRedux = connect()(Router)

class NavigationContainer extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={DrawerWrapper}>
          <Scene key='presentationScreen' component={PresentationScreen} title='Ignite' />
          <Scene key='componentExamples' component={AllComponentsScreen} title='Components' />
          <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' />
          <Scene key='login' component={LoginScreen} title='Login' />
          <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
          <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
          <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
          <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
          <Scene key='theme' component={ThemeScreen} title='Theme' />
          <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' />
        </Scene>
      </Router>
    )
  }
}

export default NavigationContainer
