import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

// NAME THIS FILE CommonStyles.js

const CommonStyles = {
  cell: {
    heading: {
      marginBottom: Metrics.smallMargin,
      fontFamily: Fonts.bold,
      fontSize: Fonts.size.regular,
      color: Colors.almostBlack
    },
    subheading: {
      marginBottom: Metrics.baseMargin,
      fontSize: Fonts.size.smallHeader,
      color: Colors.dirtyGray
    },
    text: {
      marginBottom: Metrics.baseMargin,
      fontSize: Fonts.size.smallHeader,
      color: Colors.blueTint
    }
  },
  darkLabel: {
    backgroundColor: Colors.steel,
    fontFamily: Fonts.bold,
    color: Colors.coal,
    padding: 5
  },
  groupContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionHeader: {
    backgroundColor: Colors.wave
  },
  sectionTitle: {
    ...Fonts.style.h3,
    color: Colors.coal,
    backgroundColor: Colors.silver,
    padding: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.error,
    alignItems: 'center'
  },
  subtitle: {
    color: Colors.snow,
    padding: 5,
    marginBottom: 5,
    marginHorizontal: Metrics.smallMargin
  }
}

export default CommonStyles
