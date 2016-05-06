'use strict'

import { StyleSheet } from 'react-native'
import { Metrics, Images, Base } from '../../Themes/'

export default StyleSheet.create({
  progressiveImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 3,
    alignSelf: 'center'
  },
  smallImage: {
    width: Images.size.small,
    height: Images.size.small,
    margin: Metrics.baseMargin
  },
  mediumImage: {
    width: Images.size.medium,
    height: Images.size.medium,
    margin: Metrics.baseMargin
  },
  largeImage: {
    width: Images.size.large,
    height: Images.size.large,
    margin: Metrics.baseMargin
  },
  groupContainer: {
    ...Base.groupContainer
  }
})
