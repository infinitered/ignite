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
      <Image source={Images.background} style={styles.backgroundImage}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>
          <View style={styles.hero}>
            <Text style={styles.heroText}>React Native Starter</Text>
          </View>

          <Text style={styles.section} >
            Included default screens for development, debugging, and alpha testing
            are available below.
          </Text>

          <Text style={styles.sectionTitle}>{I18n.t('componentExamples')}</Text>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
            Sometimes called a 'Style Guide', or 'Pattern Library', Examples Screen is filled with usage examples
            of fundamental components for a given application.  Use this merge-friendly way for your team
            to show/use/test components.
            </Text>
            <RoundedButton onPress={() => this.props.navigator.push(Routes.AllComponentsScreen)}>
              Component Examples Screen
            </RoundedButton>
          </View>

          <Text style={styles.sectionTitle}>{I18n.t('usageExamples')}</Text>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              The Usage Examples screen is a playground for 3rd party libs and logic proofs.
              Items on this screen can be composed of multiple components working in concert.
            </Text>
            <RoundedButton onPress={() => this.props.navigator.push(Routes.UsageExamplesScreen)}>
              Usage Examples Screen
            </RoundedButton>
          </View>

          <Text style={styles.sectionTitle}>{I18n.t('apiTesting')}</Text>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              Testing API with tools such as Postman or APIary.io are great for verifying the server works.
              The API Test screen is the next step; a simple in-app way to verify your coded API functions work as expected.
              Additionally, it's good for debugging API issues in the field.
            </Text>
            <RoundedButton onPress={() => this.props.navigator.push(Routes.APITestingScreen)}>
              API Testing Screen
            </RoundedButton>
          </View>

          <Text style={styles.sectionTitle}>{I18n.t('themeSettings')}</Text>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              List of all Theme specific settings.  Configured style of each application.
            </Text>
            <RoundedButton onPress={() => this.props.navigator.push(Routes.ThemeScreen)}>
              Theme Screen
            </RoundedButton>
          </View>

          <Text style={styles.sectionTitle}>{I18n.t('deviceDetails')}</Text>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              Dedicated to identifying specifics of the device.  All info useful for identifying outlying behaviour
              specific to a device.
            </Text>
            <RoundedButton onPress={() => this.props.navigator.push(Routes.DeviceInfoScreen)}>
              Device Info Screen
            </RoundedButton>
          </View>

          <View style={styles.centered}>
            <Text style={styles.descriptionText}>Made with ❤️ by Infinite Red</Text>
          </View>

        </ScrollView>
      </Image>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(PresentationScreen)
