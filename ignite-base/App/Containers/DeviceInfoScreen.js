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
import R from 'ramda'

import styles from './Styles/DeviceInfoScreenStyle'

import I18n from '../I18n/I18n.js'

export default class DeviceInfoScreen extends React.Component {

  // {title: 'Device Unique ID', info: DeviceInfo.getUniqueID()},
  // {title: 'Device Manufacturer', info: DeviceInfo.getManufacturer()},
  // {title: 'Device Model', info: DeviceInfo.getModel()},
  // {title: 'Device ID', info: DeviceInfo.getDeviceId()},
  // {title: 'Device System Name', info: DeviceInfo.getSystemName()},
  // {title: 'Device Version', info: DeviceInfo.getSystemVersion()},
  // {title: 'Bundle Id', info: DeviceInfo.getBundleId()},
  // {title: 'Build Number', info: DeviceInfo.getBuildNumber()},
  // {title: 'App Version', info: DeviceInfo.getVersion()},
  // {title: 'App Version (Readable)', info: DeviceInfo.getReadableVersion()},
  // {title: 'Device Name', info: DeviceInfo.getDeviceName()},
  // {title: 'Device Locale', info: DeviceInfo.getDeviceLocale()},
  // {title: 'Device Country', info: DeviceInfo.getDeviceCountry()},
  // {title: 'User Agent', info: DeviceInfo.getUserAgent()}

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

  renderHeader (header) {
    if (header) {
      return (
        <View>
          <Text>{header}</Text>
        </View>
      )
    }
  }

  renderHardwareCard (cardTitle) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{cardTitle.toUpperCase()}</Text>
        {this.renderHardwareRows()}
      </View>
    )
  }

  renderHardwareRows () {
    const HARDWARE_DATA = [
      {title: 'Device Manufacturer', info: DeviceInfo.getManufacturer()},
      {title: 'Device Name', info: DeviceInfo.getDeviceName()},
      {title: 'Device Model', info: DeviceInfo.getModel()},
      {title: 'Device Unique ID', info: DeviceInfo.getUniqueID()},
      {title: 'Device Locale', info: DeviceInfo.getDeviceLocale()},
      {title: 'Device Country', info: DeviceInfo.getDeviceCountry()},
      {title: 'User Agent', info: DeviceInfo.getUserAgent()}
    ]
    let index = 0
    const rows = (
      R.map((cell) => {
        const {title, info} = cell
        return (
          <View key={index++} style={styles.rowContainer}>
            <View style={styles.rowLabelContainer}>
              <Text style={styles.rowLabel}>{title}</Text>
            </View>
            <View style={styles.rowInfoContainer}>
              <Text style={styles.rowInfo}>{info}</Text>
            </View>
          </View>
        )
      }, HARDWARE_DATA)
    )
    return rows
  }

  renderOSCard (cardTitle) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{cardTitle.toUpperCase()}</Text>
        {this.renderOSRows()}
      </View>
    )
  }

  renderOSRows () {
    const OS_DATA = [
      {title: 'Device System Name', info: DeviceInfo.getSystemName()},
      {title: 'Device ID', info: DeviceInfo.getDeviceId()},
      {title: 'Device Version', info: DeviceInfo.getSystemVersion()}
    ]
    let index = 0
    const rows = (
      R.map((cell) => {
        const {title, info} = cell
        return (
          <View key={index++} style={styles.rowContainer}>
            <View style={styles.rowLabelContainer}>
              <Text style={styles.rowLabel}>{title}</Text>
            </View>
            <View style={styles.rowInfoContainer}>
              <Text style={styles.rowInfo}>{info}</Text>
            </View>
          </View>
        )
      }, OS_DATA)
    )
    return rows
  }

  renderAppCard (cardTitle) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{cardTitle.toUpperCase()}</Text>
        {this.renderAppRows()}
      </View>
    )
  }

  renderAppRows () {
    const APP_DATA = [
      {title: 'Bundle Id', info: DeviceInfo.getBundleId()},
      {title: 'Build Number', info: DeviceInfo.getBuildNumber()},
      {title: 'App Version', info: DeviceInfo.getVersion()},
      {title: 'App Version (Readable)', info: DeviceInfo.getReadableVersion()}
    ]
    let index = 0
    const rows = (
      R.map((cell) => {
        const {title, info} = cell
        return (
          <View key={index++} style={styles.rowContainer}>
            <View style={styles.rowLabelContainer}>
              <Text style={styles.rowLabel}>{title}</Text>
            </View>
            <View style={styles.rowInfoContainer}>
              <Text style={styles.rowInfo}>{info}</Text>
            </View>
          </View>
        )
      }, APP_DATA)
    )
    return rows
  }

  render () {
    return (
      <ScrollView style={[styles.container, {height: this.state.visibleHeight}]}>
        {this.renderHardwareCard('Device Hardware')}
        {this.renderOSCard('Device OS')}
        {this.renderAppCard('App Info')}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(DeviceInfoScreen)
