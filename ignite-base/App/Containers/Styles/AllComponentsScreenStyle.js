import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, Base, Images } from '../../Themes/'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
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
  loginBox: {
    padding: 20
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  componentLabel: {
    ...Base.darkLabel,
    marginBottom: 5
  },
  temperature: {
    fontSize: Fonts.size.title
  },
  groupContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
