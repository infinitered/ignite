// @flow

import {StyleSheet} from 'react-native'
import { Metrics, Colors } from '../../Themes/'

const navButton = {
  marginLeft: Metrics.baseMargin,
  backgroundColor: Colors.transparent,
  marginTop: Metrics.doubleBaseMargin,
  width: Metrics.icons.medium
}

export default StyleSheet.create({
  navButtonLeft: {
    ...navButton
  },
  searchButton: {
    ...navButton,
    marginBottom: Metrics.baseMargin
  }

})
