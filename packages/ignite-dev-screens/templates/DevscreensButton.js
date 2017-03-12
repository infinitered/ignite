import React from 'react'
import { View, Modal, Platform } from 'react-native'
import DebugConfig from '../../App/Config/DebugConfig'
import RoundedButton from '../../App/Components/RoundedButton'
import PresentationScreen from './PresentationScreen'

export default class DevscreensButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    if (DebugConfig.showDevScreens) {
      return (
        <View>
          <RoundedButton onPress={this.toggleModal}>
            Open DevScreens
          </RoundedButton>
          <Modal
            visible={this.state.showModal}
            onRequestClose={
              Platform.OS === 'android' ? this.toggleModal : undefined
            }
          >
            <PresentationScreen screenProps={{ toggle: this.toggleModal }} />
          </Modal>
        </View>
      )
    } else {
      return <View />
    }
  }
}
