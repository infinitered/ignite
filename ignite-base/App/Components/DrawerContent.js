import React, { PropTypes } from 'react'
import { ScrollView, Image } from 'react-native'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import styles from './Styles/DrawerContentStyle'
import Routes from '../Navigation/Routes'

class DrawerContent extends React.Component {
  constructor (props) {
    super(props)
    this.handlePressComponent = props.onPushRoute.bind(this, Routes.AllComponentsScreen)
    this.handlePressUsage = props.onPushRoute.bind(this, Routes.UsageExamplesScreen)
    this.handlePressApi = props.onPushRoute.bind(this, Routes.APITestingScreen)
    this.handlePressTheme = props.onPushRoute.bind(this, Routes.ThemeScreen)
    this.handlePressDeviceInfo = props.onPushRoute.bind(this, Routes.DeviceInfoScreen)
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton text='Component Examples' onPress={this.handlePressComponent} />
        <DrawerButton text='Usage Examples' onPress={this.handlePressUsage} />
        <DrawerButton text='API Testing' onPress={this.handlePressApi} />
        <DrawerButton text='Themes' onPress={this.handlePressTheme} />
        <DrawerButton text='Device Info' onPress={this.handlePressDeviceInfo} />
      </ScrollView>
    )
  }
}

DrawerContent.propTypes = {
  onPushRoute: PropTypes.func.isRequired
}

export default DrawerContent
