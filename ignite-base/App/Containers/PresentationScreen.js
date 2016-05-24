import React, {PropTypes} from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import Routes from '../Navigation/Routes'
import RoundedButton from '../Components/RoundedButton'
import I18n from '../I18n/I18n.js'

// Styles
import styles from './Styles/PresentationScreenStyle'

export default class PresentationScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.centered}>
          <Image source={Images.ignite} style={styles.logo} />
        </View>
        <Text style={styles.section} >
          By default this project has quite a few 🎶 bells and whistles 🎶.  Blog
          posts and docs regarding this tool can be found on the README.md document.
        </Text>
        <Text style={styles.section} >
          Some default screens for development, debugging, and alpha testing
          any product are available below.
        </Text>

        <Text style={styles.sectionTitle}>{I18n.t('componentExamples')}</Text>
        <Text style={styles.description}>
          Sometimes called a 'Style Guide', or 'Pattern Library' filled with usage examples
          of fundamental components for a given application.  The component examples screen
          allows for a git-friendly way for a team of devs to show/use/test their components
          with examples that reside within the component file.
        </Text>
        <RoundedButton onPress={() => this.props.navigator.push(Routes.AllComponentsScreen)}>
          Component Examples Screen
        </RoundedButton>

        <Text style={styles.sectionTitle}>{I18n.t('usageExamples')}</Text>
        <Text style={styles.description}>
          The Usage Examples screen is a playground for 3rd party libs and logic proofs.
          Items on this screen can be composed of multiple components working in concert.
        </Text>
        <RoundedButton onPress={() => this.props.navigator.push(Routes.UsageExamplesScreen)}>
          Usage Examples Screen
        </RoundedButton>

        <Text style={styles.sectionTitle}>{I18n.t('apiTesting')}</Text>
        <Text style={styles.description}>
          Testing API with tools such as Postman or APIary.io are great for verifying the server works.
          The API Test screen is the next step; a simple in-app way to verify your coded API functions work as expected.
          Additionally, it's good for debugging API issues in the field.
        </Text>
        <RoundedButton onPress={() => this.props.navigator.push(Routes.APITestingScreen)}>
          API Testing Screen
        </RoundedButton>

        <Text style={styles.sectionTitle}>{I18n.t('themeSettings')}</Text>
        <Text style={styles.description}>
          List of all Theme specific settings.  Configured style of each application.
        </Text>
        <RoundedButton onPress={() => this.props.navigator.push(Routes.ThemeScreen)}>
          Theme Screen
        </RoundedButton>

        <Text style={styles.sectionTitle}>{I18n.t('deviceDetails')}</Text>
        <Text style={styles.description}>
          Dedicated to identifying specifics of the device.  All info useful for identifying outlying behaviour
          specific to a device.
        </Text>
        <RoundedButton onPress={() => this.props.navigator.push(Routes.DeviceInfoScreen)}>
          Device Info Screen
        </RoundedButton>

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(PresentationScreen)
