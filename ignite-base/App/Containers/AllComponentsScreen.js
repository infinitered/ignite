// @flow

// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { Platform, View, ScrollView, Text, Image } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/AllComponentsScreenStyle'

// Components to show examples (only real point of merge conflict)
import '../Components/AlertMessage'
import '../Components/FullButton'
import '../Components/RoundedButton'
import '../Components/DrawerButton'
// import '../Components/MapCallout'

// Examples Render Engine
import ExamplesRegistry from '../Services/ExamplesRegistry'

class AllComponentsScreen extends React.Component {

  renderAndroidWarning () {
    if (Platform.OS === 'android') {
      return (
        <Text style={styles.sectionText}>
          Android only: Animations are slow? You are probably running the app in debug mode.
          It will run more smoothly once your app will be built.
        </Text>
      )
    }
    return null
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            {this.renderAndroidWarning()}
            <Text style={styles.sectionText}>
              Sometimes called a 'Style Guide', or 'Pattern Library', Examples Screen is filled with usage examples
              of fundamental components for a given application.  Use this merge-friendly way for your team
              to show/use/test components.  Examples are registered inside each component's file for quick changes and usage identification.
            </Text>
            <Text style={styles.subtitle} >
              All components that register examples will be rendered below:
            </Text>
          </View>

          {ExamplesRegistry.render()}

        </ScrollView>
      </View>
    )
  }
}

export default AllComponentsScreen
