import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginTop: Metrics.navBarHeight,
    flex: 1
  },
  item: {
    width: 100,
    color: Colors.snow,
    backgroundColor: Colors.fire,
    margin: Metrics.baseMargin,
    borderRadius: 5
  },
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
