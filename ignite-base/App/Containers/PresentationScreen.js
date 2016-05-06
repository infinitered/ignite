import React from 'react'
import { ScrollView, Text, PropTypes, Image, View } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import Routes from '../Navigation/Routes'
import RoundedButton from '../Components/RoundedButton'

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
          By default this project has quite a few bells and whistles.  The
          software and blog posts can be found on the README.md document.
        </Text>
        <Text style={styles.section} >
          The default screens for development, debugging, and alpha testing
          are available below.
        </Text>

        <Text style={styles.sectionTitle}>Component Examples</Text>
        <Text style={styles.description}>
          Developers/designers begin a project by creating a 'Style Guide',
          or 'Pattern Library' filled with usage examples of fundamental components for
          a given application.  The component examples screen allows for a git-friendly
          way for a team of devs to show/use/test their components with examples that reside
          within the component file.
        </Text>
        <RoundedButton onPress={() => this.props.navigator.push(Routes.AllComponentsScreen)}>
          Component Examples Screen
        </RoundedButton>

        <Text style={styles.sectionTitle}>Usage Examples</Text>
        <Text style={styles.description}>
          The Usage Examples screen, is a playground for 3rd party libs and logic flow proofs.
          Items on this screen can be composed of multiple components working in concert.
        </Text>

        <Text style={styles.sectionTitle}>API Testing</Text>
        <Text style={styles.description}>
          Testing API with tools such as Postman or APIary.io are great for verifying the server works.
          The API Test screen is a simple in-app way to verify your API functions work as expected.  Additionally,
          it's good for debugging API issues in the field.
        </Text>

        <Text style={styles.sectionTitle}>Theme Settings</Text>
        <Text style={styles.description}>
          List of all Theme specific settings.  Configured style of each application.
        </Text>

        <Text style={styles.sectionTitle}>Device Details</Text>
        <Text style={styles.description}>
          Dedicated to identifying specifics of the device.  All info useful for identifying outlying behaviour
          specific to a device.
        </Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(PresentationScreen)
