// An All Components Screen is a great way to dev and quick-test components
import React, {PropTypes} from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'

// Components to show examples (only real point of merge conflict)
import '../Components/ProgressiveImage'
import '../Components/FullButton'
import '../Components/RoundedButton'
// Examples Render Engine
import ExamplesRegistry from '../Services/ExamplesRegistry'

export default class AllComponentsScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  render () {
    return (
      <ScrollView style={styles.screenContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.subtitle}>
            Examples are registered inside each component's file for quick changes and usage identification.
          </Text>
          <Text style={styles.subtitle} >
            All components with registered examples will be rendered below:
          </Text>
        </View>

        {ExamplesRegistry.render()}

      </ScrollView>
    )
  }
}

export default connect()(AllComponentsScreen)
