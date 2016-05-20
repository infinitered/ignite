import { StyleSheet } from 'react-native'
import { Colors, Metrics, CommonStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  groupContainer: {
    ...CommonStyles.groupContainer
  },
  sectionHeader: {
    ...CommonStyles.sectionHeader
  },
  sectionTitle: {
    ...CommonStyles.sectionTitle
  },
  subtitle: {
    ...CommonStyles.subtitle
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  backgroundContainer: {
    position: 'relative',
    width: 100,
    height: 100
  },
  backgroundImage: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    resizeMode: 'stretch'
  },
  colorContainer: {
    height: 130,
    padding: 5,
    marginBottom: 5
  },
  colorSquare: {
    width: 100,
    height: 100
  },
  colorName: {
    width: 100,
    height: 20,
    lineHeight: 20,
    color: Colors.charcoal,
    textAlign: 'center'
  },
  fontRow: {
    padding: 5,
    fontSize: 24,
    marginHorizontal: 5,
    flex: 1
  }
})
