import { StyleSheet } from 'react-native'
import { Colors, Metrics, CommonStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  sectionHeader: {
    ...CommonStyles.sectionHeader
  },
  subtitle: {
    ...CommonStyles.subtitle
  }
})
