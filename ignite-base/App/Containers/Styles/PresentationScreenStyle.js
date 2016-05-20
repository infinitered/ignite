import { StyleSheet } from 'react-native'
import { Colors, Metrics, CommonStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  logo: {
    height: 300,
    width: 300,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  section: {
    margin: Metrics.baseMargin,
    color: Colors.panther
  },
  sectionTitle: {
    ...CommonStyles.sectionTitle
  },
  description: {
    margin: Metrics.baseMargin,
    color: Colors.coal
  }
})
