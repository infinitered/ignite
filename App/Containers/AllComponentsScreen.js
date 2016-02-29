// An All Components Screen is a great way to dev and quick-test components
import React, { View, ScrollView, Text, TouchableOpacity, Linking, WebView } from 'react-native'
// import { connect } from 'react-redux'
import styles from '../Styles/AllComponentsScreenStyle'
import ProgressiveImage from '../Components/ProgressiveImage'
import { Images } from '../Themes'

export default class AllComponentsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      webViewHeight: 0
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    subjectId: React.PropTypes.number,
    profileImage: React.PropTypes.string,
    thumbnailUri: React.PropTypes.string,
    customFields: React.PropTypes.array
  };

  render () {
    return (
      <View style={styles.screenContainer}>
        <Text>Progressive Image</Text>
        <ProgressiveImage
          style={styles.progressiveImage}
          defaultSource={Images.logo}
          source='https://upload.wikimedia.org/wikipedia/commons/c/cc/ESC_large_ISS022_ISS022-E-11387-edit_01.JPG'
          thumbnail='http://i.imgur.com/eVAFUhj.png'
        />
      </View>
    )
  }
}

// function mapStateToProps (state) {
//   return {
//     // reducer connections
//   }
// }

// export default connect(mapStateToProps)(AllComponentsScreen)
