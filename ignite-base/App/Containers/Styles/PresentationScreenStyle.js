import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  backgroundImage: {
    resizeMode: 'stretch',
    width: Metrics.screenWidth,
    flex: 1,
    marginTop: Metrics.navBarHeight
  },
  container: {
    flex: 1,
    paddingTop: Metrics.baseMargin
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  hero: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 5
  },
  heroText: {
    ...ApplicationStyles.subtitle,
    ...Fonts.style.h5
  },
  centered: {
    alignItems: 'center'
  },
  section: {
    margin: Metrics.section,
    padding: Metrics.baseMargin,
    borderTopColor: Colors.ricePaper,
    borderTopWidth: 0.5,
    borderBottomColor: Colors.ricePaper,
    borderBottomWidth: 1
  },
  sectionText: {
    color: Colors.snow,
    marginVertical: Metrics.smallMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.bold
  },
  sectionTitle: {
    ...ApplicationStyles.sectionTitle
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
