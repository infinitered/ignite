// An All Components Screen is a great way to dev and quick-test components
import React, { View, ScrollView, Text, TouchableOpacity, Linking, WebView } from 'react-native'
// import { connect } from 'react-redux'
import styles from '../Styles/AllComponentsScreenStyle'
import ProgressiveImage from '../Components/ProgressiveImage'

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
        <Text>Progressive Image Loader</Text>
        <ProgressiveImage style={styles.progressiveImage} source='https://upload.wikimedia.org/wikipedia/commons/c/cc/ESC_large_ISS022_ISS022-E-11387-edit_01.JPG' thumbnail='http://store.storeimages.cdn-apple.com/4973/as-images.apple.com/is/image/AppleInc/aos/published/images/H/HP/HHPW2/HHPW2_AV2?wid=38&hei=38&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1453539755807'/>
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
