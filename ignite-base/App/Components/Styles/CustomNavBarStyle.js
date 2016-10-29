import { Colors, Metrics } from '../../Themes/'

export default {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Metrics.navBarHeight,
    paddingTop: Metrics.baseMargin,
    paddingHorizontal: 20,
    backgroundColor: Colors.fire,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}
