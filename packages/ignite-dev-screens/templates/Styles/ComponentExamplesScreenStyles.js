import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../DevTheme/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  sectionText: {
    ...Fonts.base,
    color: Colors.text,
    fontSize: 12,
    lineHeight: Metrics.doubleBaseMargin + 5
  },
  mainContainer: {
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  description: {
    marginVertical: Metrics.doubleSection
  }
})
