import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../Themes/'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: Metrics.baseMargin,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  progressiveImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 3,
    alignSelf: 'center'
  }
})
