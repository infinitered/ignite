import {StyleSheet} from 'react-native'
import { Fonts, Metrics, Colors } from '../../Themes/'

const NavigationStyle = StyleSheet.create({
  titleWrapper: {
    flex: 1,
    padding: Metrics.baseMargin,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navTitle: {
    color: Colors.snow,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.bold,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  navSubtitle: {
    flex: 1,
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.base,
    alignSelf: 'center'
  },
  navButtonText: {
    color: Colors.snow,
    marginTop: 8,
    marginLeft: 8,
    fontFamily: Fonts.bold,
    padding: Metrics.baseMargin
  },
  navButtonLeft: {
    margin: Metrics.baseMargin
  },
  navigationBar: {
    backgroundColor: Colors.background,
    height: Metrics.navBarHeight
  }
})

export default NavigationStyle
