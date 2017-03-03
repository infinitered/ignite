import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../DevTheme/'

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth / 2,
    aspectRatio: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.eggplant
  },
  image: {
    width: Metrics.icons.xl,
    height: Metrics.icons.xl,
    margin: Metrics.baseMargin
  },
  label: {
    ...Fonts.style.h2,
    fontSize: 14,
    color: Colors.text
  }
})
