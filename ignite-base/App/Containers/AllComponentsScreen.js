// An All Components Screen is a great way to dev and quick-test components
import React, {PropTypes} from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'

// Components to show examples (only real point of merge conflict)
import '../Components/AlertMessageComponent'
import '../Components/ProgressiveImage'
import '../Components/FullButton'
import '../Components/RoundedButton'
// Examples Render Engine
import ExamplesRegistry from '../Services/ExamplesRegistry'

class AllComponentsScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section}>
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

export default connect()(AllComponentsScreen)
