import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginTop: Metrics.navBarHeight,
    flex: 1
  },
  gridItem: {
    width: 100,
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 5
  },
  grid: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
