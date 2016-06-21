// An All Components Screen is a great way to dev and quick-test components
import React, {PropTypes} from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { Metrics, Images } from '../Themes'

import styles from './Styles/DeviceInfoScreenStyle'

const HARDWARE_DATA = [
  {title: 'Device Manufacturer', info: DeviceInfo.getManufacturer()},
  {title: 'Device Name', info: DeviceInfo.getDeviceName()},
  {title: 'Device Model', info: DeviceInfo.getModel()},
  {title: 'Device Unique ID', info: DeviceInfo.getUniqueID()},
  {title: 'Device Locale', info: DeviceInfo.getDeviceLocale()},
  {title: 'Device Country', info: DeviceInfo.getDeviceCountry()},
  {title: 'User Agent', info: DeviceInfo.getUserAgent()},
  {title: 'Screen Width', info: Metrics.screenWidth},
  {title: 'Screen Height', info: Metrics.screenHeight}
]

const OS_DATA = [
  {title: 'Device System Name', info: DeviceInfo.getSystemName()},
  {title: 'Device ID', info: DeviceInfo.getDeviceId()},
  {title: 'Device Version', info: DeviceInfo.getSystemVersion()}
]

const APP_DATA = [
  {title: 'Bundle Id', info: DeviceInfo.getBundleId()},
  {title: 'Build Number', info: DeviceInfo.getBuildNumber()},
  {title: 'App Version', info: DeviceInfo.getVersion()},
  {title: 'App Version (Readable)', info: DeviceInfo.getReadableVersion()}
]

export default class DeviceInfoScreen extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  renderCard (cardTitle, rowData) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{cardTitle.toUpperCase()}</Text>
        {this.renderRows(rowData)}
      </View>
    )
  }

  renderRows (rowData) {
    return rowData.map((cell) => {
      const {title, info} = cell
      return (
        <View key={title} style={styles.rowContainer}>
          <View style={styles.rowLabelContainer}>
            <Text style={styles.rowLabel}>{title}</Text>
          </View>
          <View style={styles.rowInfoContainer}>
            <Text style={styles.rowInfo}>{info}</Text>
          </View>
        </View>
      )
    })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText} >
              Dedicated to identifying specifics of the device.  All info useful for identifying outlying behaviour specific to a device.
            </Text>
          </View>
          {this.renderCard('Device Hardware', HARDWARE_DATA)}
          {this.renderCard('Device OS', OS_DATA)}
          {this.renderCard('App Info', APP_DATA)}
        </ScrollView>
      </View>
    )
  }
}
