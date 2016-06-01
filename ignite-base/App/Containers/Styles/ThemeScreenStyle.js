import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  groupContainer: {
    ...ApplicationStyles.groupContainer
  },
  sectionHeader: {
    ...ApplicationStyles.darkLabel
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  backgroundContainer: {
    position: 'relative',
    width: 102,
    height: 102,
    borderWidth: 1,
    borderColor: Colors.frost
  },
  backerImage: {
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
    flex: 1,
    color: Colors.snow
  }
})
