'use strict'

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 10,
    margin: Metrics.smallMargin,
    borderColor: Colors.bloodOrange,
    borderWidth: 2,
    backgroundColor: Colors.bloodOrangeJuice,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.regular
  }
})
