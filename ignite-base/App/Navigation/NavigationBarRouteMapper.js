import React from 'react'
import { Text, View } from 'react-native'
// For some reason using this causes a crash: Investigate
// import { MapButton } from '../Components/Buttons/MapButton'
import NavButtons from './NavButtons'
// Stylesheet
import styles from './Styles/NavigationStyle'

export default {

  CreateButton (buttonId, navigator) {
    switch (buttonId) {
      // case 'SEARCH':
      //   return NavButtons.searchButton(navigator.state.tapSearch)
      // case 'MAP':
      //   return NavButtons.mapButton(navigator.state.tapMap)
      // case 'COMPOSE':
      //   return NavButtons.composeButton(navigator.state.tapCompose)
      case 'BACK':
        return NavButtons.backButton(this.BackButton.bind(this, navigator))
      case 'FORGOT_PASSWORD':
        return NavButtons.forgotPasswordButton(navigator.state.tapForgotPassword)
      case 'HAMBURGER':
        return NavButtons.hamburgerButton(navigator.state.tapHamburger)
      default:
        return (<Text>Needs Button</Text>)
    }
  },

  // Since this may appear for a moment in transitions
  // We don't want it to do an additional back if back was
  // already pressed.   Checking the transition state fixes this.
  BackButton (navigator) {
    if (navigator.state.activeGesture === null && navigator.state.pendingGestureProgress === null) {
      navigator.pop()
    }
  },

  // drives
  LeftButton (route, navigator, index, navState) {
    if (navState.leftButton) {
      return navState.leftButton
    } else if (route.leftButton) {
      return this.CreateButton(route.leftButton, navigator)
    }

    return null
  },

  RightButton (route, navigator, index, navState) {
    if (navState.rightButton) {
      return navState.rightButton
    } else if (route.rightButton) {
      return this.CreateButton(route.rightButton, navigator)
    }
  },

  renderSubtitle (sub, routeSub) {
    if (sub) {
      return (
        <View>
          <Text allowFontScaling={false} style={styles.navSubtitle}>
            {sub || routeSub}
          </Text>
        </View>
      )
    }
  },

  Title (route, navigator, index, navState) {
    return (
      <View style={styles.titleWrapper}>
        <Text allowFontScaling={false} style={styles.navTitle}>
          {navState.title || route.title}
        </Text>
        {this.renderSubtitle(navState.subtitle, route.subtitle)}
      </View>
    )
  }
}
