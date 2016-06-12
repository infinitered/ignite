import React, { PropTypes } from 'react'
import { View, ScrollView, Text, LayoutAnimation, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'

// Styles
import styles from './Styles/ListviewExampleStyle'

// I18n
import I18n from '../I18n/I18n.js'

export default class ListviewExample extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  render () {
    return (
      <ScrollView style={[styles.container, {height: this.state.visibleHeight}]}>
        <Text>ListviewExample Container</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(ListviewExample)
