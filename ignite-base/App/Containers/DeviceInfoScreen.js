// An All Components Screen is a great way to dev and quick-test components
import React, {PropTypes} from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import DeviceInfo from 'react-native-device-info'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'

import styles from './Styles/DeviceInfoScreenStyle'

import I18n from '../I18n/I18n.js'

export default class DeviceInfoScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight
    }
  }

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
      <ScrollView style={[styles.container, {height: this.state.visibleHeight}]}>
        <Text>{DeviceInfo.getDeviceName()}</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(DeviceInfoScreen)
