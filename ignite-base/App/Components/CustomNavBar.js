import React from 'react'
import { Image, Animated } from 'react-native'
import { Images } from '../Themes'
import Styles from './Styles/CustomNavBarStyle'

export default class CustomNavBar extends React.Component {
  render () {
    return (
      <Animated.View style={Styles.container}>
        <Image style={Styles.logo} source={Images.clearLogo} />
      </Animated.View>
    )
  }
}

