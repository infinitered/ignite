// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { View, ScrollView, Text, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'

// Components to show examples (only real point of merge conflict)
import '../Components/ProgressiveImage'
import '../Components/FullButton'
// Examples Render Engine
import ExamplesRegistry from '../Services/ExamplesRegistry'

// I18n
import I18n from '../I18n/I18n.js'

export default class AllComponentsScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  render () {
    return (
      <ScrollView style={styles.screenContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Component Examples</Text>
          <Text style={styles.subtitle} >All components with registered example usages</Text>
        </View>
        {ExamplesRegistry.render()}
      </ScrollView>
    )
  }
}

export default connect()(AllComponentsScreen)
