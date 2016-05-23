import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.ocean
  },
  cardTitle: {
    alignSelf: 'center',
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    marginTop: Metrics.baseMargin
  },
  cardContainer: {
    backgroundColor: Colors.steel,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 7,
      width: 7
    },
    shadowOpacity: 0.55,
    shadowRadius: 2,
    paddingBottom: Metrics.baseMargin,
    margin: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin * 3
  },
  rowContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowOpacity: 0.55,
    shadowRadius: 2,
    margin: Metrics.baseMargin
  },
  rowLabelContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.snow
  },
  rowLabel: {
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin
  },
  rowInfoContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: Colors.silver
  },
  rowInfo: {
    fontSize: Fonts.size.regular,
    margin: Metrics.baseMargin
  }
})
