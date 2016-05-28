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
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    backgroundColor: Colors.smoke,
    padding: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  descriptionText: {
    ...Fonts.style.description,
    color: Colors.snow
  }
})
