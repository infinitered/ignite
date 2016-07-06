import React, { Component, PropTypes } from 'react'
import { ScrollView, Image } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'

class DrawerContent extends Component {

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton text='Component Examples' onPress={this.props.componentExamples} />
        <DrawerButton text='Usage Examples' onPress={this.props.usageExamples} />
        <DrawerButton text='API Testing' onPress={this.props.apiTesting} />
        <DrawerButton text='Themes' onPress={this.props.theme} />
        <DrawerButton text='Device Info' onPress={this.props.deviceInfo} />
      </ScrollView>
    )
  }

}

DrawerContent.propTypes = {
  componentExamples: PropTypes.func.isRequired,
  usageExamples: PropTypes.func.isRequired,
  apiTesting: PropTypes.func.isRequired,
  theme: PropTypes.func.isRequired,
  deviceInfo: PropTypes.func.isRequired
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
