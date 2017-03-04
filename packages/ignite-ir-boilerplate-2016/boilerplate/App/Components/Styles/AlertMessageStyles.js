import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: Metrics.section
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  message: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: Colors.steel
  },
  icon: {
    color: Colors.steel
  }
})
