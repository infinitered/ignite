'use strict'

import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  progressiveImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 3,
    alignSelf: 'center'
  }
})
