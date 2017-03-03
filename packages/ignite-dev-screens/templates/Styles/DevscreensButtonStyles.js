import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../DevTheme/'

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth / 2,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.eggplant
  },
  hamburgerImage: {
    width: Metrics.icons.large,
    height: Metrics.icons.large,
    marginHorizontal: 15
  },
  label: {
    ...Fonts.style.h2,
    fontSize: 14,
    color: Colors.text
  }
})
