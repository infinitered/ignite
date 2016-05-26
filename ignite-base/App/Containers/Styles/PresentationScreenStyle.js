import { StyleSheet } from 'react-native'
import { Colors, Metrics, CommonStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  backgroundImage: {
    resizeMode: 'stretch',
    width: Metrics.screenWidth,
    top: 0,
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight
  },
  logo: {
    height: 300,
    width: 300,
    resizeMode: 'contain'
  },
  hero: {
    backgroundColor: Colors.cloud,
    alignItems: 'center',
    marginVertical: 20,
    padding: 5
  },
  heroText: {
    ...CommonStyles.subtitle,
    ...Fonts.style.h6
  },
  centered: {
    alignItems: 'center'
  },
  section: {
    margin: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    color: Colors.snow,
    backgroundColor: Colors.ember,
    borderRadius: 5
  },
  sectionTitle: {
    ...CommonStyles.sectionTitle
  },
  description: {
    marginBottom: Metrics.smallMargin,
    color: Colors.coal,
    backgroundColor: Colors.silver,
    padding: 5
  }
})
