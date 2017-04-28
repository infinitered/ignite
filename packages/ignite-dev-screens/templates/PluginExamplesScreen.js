// Fair Warning:  PluginExamples has a good bit of Ignite automation in editing.
// Though robust, if you should modify this file, review your changes with us
// As to not break the automated addition/subtractions.
import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Images } from './DevTheme'

// Examples Render Engine
import ExamplesRegistry from '../../App/Services/ExamplesRegistry'

// Styles
import styles from './Styles/PluginExamplesScreenStyles'

class PluginExamplesScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
        </TouchableOpacity>
        <ScrollView style={styles.container}>
          <View style={{alignItems: 'center', paddingTop: 60}}>
            <Image source={Images.usageExamples} style={styles.logo} />
            <Text style={styles.titleText}>Plugin Examples</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionText} >
              The Plugin Examples screen is a playground for 3rd party libs and logic proofs.
              Items on this screen can be composed of multiple components working in concert.  Functionality demos of libs and practices
            </Text>
          </View>

          {ExamplesRegistry.renderPluginExamples()}

          <View style={styles.screenButtons} />

        </ScrollView>
      </View>
    )
  }
}

export default StackNavigator({
  PluginExamplesScreen: {screen: PluginExamplesScreen}
}, {
  cardStyle: {
    opacity: 1,
    backgroundColor: '#3e243f'
  },
  headerMode: 'none',
  initialRouteName: 'PluginExamplesScreen'
})
