import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const base = {
  cell: {
    heading: {
      marginBottom: Metrics.smallMargin,
      fontFamily: Fonts.bold,
      fontSize: Metrics.fonts.regular,
      color: Colors.almostBlack
    },
    subheading: {
      marginBottom: Metrics.baseMargin,
      fontSize: Metrics.fonts.smallHeader,
      color: Colors.dirtyGray
    },
    text: {
      marginBottom: Metrics.baseMargin,
      fontSize: Metrics.fonts.smallHeader,
      color: Colors.blueTint
    }
  }
}

export default base
