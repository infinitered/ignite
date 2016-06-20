import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginTop: Metrics.navBarHeight,
    flex: 1
  },
  item: {
    ...ApplicationStyles.screen.sectionText,
    backgroundColor: Colors.fire
  },
  listContent: {
    flex: 1
  }
})
