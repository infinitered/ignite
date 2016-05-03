import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, Base } from '../../Themes/'

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
    ...Base.darkLabel,
    marginBottom: 5
  },
  temperature: {
    fontSize: Fonts.size.title
  },
  locale: {
    fontSize: Fonts.size.input
  },
  groupContainer: {
    ...Base.groupContainer
  }
})
