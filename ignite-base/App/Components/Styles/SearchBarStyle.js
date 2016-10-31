import {StyleSheet} from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.smallMargin,
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    width: Metrics.screenWidth - Metrics.baseMargin,
    justifyContent: 'center'
  },
  searchInput: {
    flex: 5,
    height: Metrics.searchBarHeight,
    alignSelf: 'center',
    margin: Metrics.smallMargin,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.instructions,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.snow,
    paddingLeft: 30,
    color: Colors.snow,
    marginLeft: Metrics.baseMargin
  },
  searchIconContainer: {
    position: 'absolute',
    height: 40,
    left: Metrics.doubleBaseMargin,
    top: 7,
    justifyContent: 'center'
  },
  searchIcon: {
    color: Colors.snow,
    backgroundColor: Colors.transparent
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.baseMargin
  },
  buttonLabel: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular
  }
})
