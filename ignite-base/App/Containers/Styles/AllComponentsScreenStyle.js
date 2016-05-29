import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  loginBox: {
    padding: 20
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  componentLabel: {
    ...ApplicationStyles.darkLabel,
    marginBottom: 5
  },
  temperature: {
    fontSize: Fonts.size.title
  },
  locale: {
    fontSize: Fonts.size.input
  },
  groupContainer: {
    ...ApplicationStyles.groupContainer
  },
  sectionHeader: {
    ...ApplicationStyles.sectionHeader
  },
  sectionTitle: {
    ...ApplicationStyles.sectionTitle
  },
  subtitle: {
    ...ApplicationStyles.subtitle
  }
})
