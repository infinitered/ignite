import React from 'react'
import { Text, Image, Animated } from 'react-native'
import { Images } from '../Themes'
import Styles from './Styles/CustomNavBarStyle'

export default class CustomNavBar extends React.Component {
  render () {
    return (
      <Animated.View style={Styles.container}>
        <Image source={Images.logo} />
        <Text>CustomNavBar</Text>
      </Animated.View>
    )
  }
}

