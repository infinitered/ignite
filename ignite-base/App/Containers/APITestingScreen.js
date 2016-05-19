// An All Components Screen is a great way to dev and quick-test components
import React, { PropTypes } from 'react'
import { ScrollView, View, Text, LayoutAnimation, DeviceEventEmitter, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Metrics } from '../Themes'
import FullButton from '../Components/FullButton'
// For API
import API from '../Services/Api'
import FJSON from 'format-json'

// Styles
import styles from './Styles/APITestingScreenStyle'

// API buttons here:
const endpoints = [
  { label: 'Get City (Boise)', endpoint: 'getCity', args: ['Boise'] },
  { endpoint: 'getCity', args: ['Toronto'] }
]

export default class APITestingScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight
    }

    this.api = API.create()
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
  }

  componentWillUnmount () {
    DeviceEventEmitter.removeAllListeners('keyboardDidShow')
    DeviceEventEmitter.removeAllListeners('keyboardDidHide')
  }

  keyboardDidShow (e) {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize
    })
  }

  keyboardDidHide (e) {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight
    })
  }

  showResult (response, title = 'Response') {
    this.refs.container.scrollTo({x: 0, y: 0, animated: true})
    if (response.ok) {
      // this.props.navigator.setState({title})
      this.refs.result.setState({message: FJSON.plain(response.data), title: title})
    } else {
      this.refs.result.setState({message: response.problem, title: title})
    }
  }

  tryEndpoint (apiEndpoint) {
    const { label, endpoint, args = [''] } = apiEndpoint
    this.api[endpoint].apply(this, args).then((result) => {
      this.showResult(result, label || `${endpoint}(${args.join(', ')})`)
    })
  }

  renderButton (apiEndpoint) {
    const { label, endpoint, args = [''] } = apiEndpoint
    return (
      <FullButton text={label || `${endpoint}(${args.join(', ')})`} onPress={this.tryEndpoint.bind(this, apiEndpoint)} styles={{marginTop: 10}} key={`${endpoint}-${args.join('-')}`} />
    )
  }

  renderButtons () {
    return endpoints.map((endpoint) => this.renderButton(endpoint))
  }

  render () {
    return (
      <ScrollView ref='container' style={[styles.container, {height: this.state.visibleHeight}]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.subtitle}>
            API function testing -
            Create new endpoints in Services/Api.js then add example uses to endpoints array in Containers/APITestingScreen.js for immediate feedback.
          </Text>
        </View>
        {this.renderButtons()}
        <APIResult ref='result' />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(APITestingScreen)

class APIResult extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      message: false,
      title: false
    }
  }

  onApiPress () {
    this.setState({message: false})
  }

  renderView () {
    return (
      <ScrollView style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' }} overflow='hidden'>
        <TouchableOpacity
          style={{backgroundColor: 'white', padding: 20}}
          onPress={this.onApiPress.bind(this)}
        >
          <Text>{this.state.title} Response:</Text>
          <Text allowFontScaling={false} style={{fontFamily: 'CourierNewPS-BoldMT', fontSize: 10}}>
            {this.state.message}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  render () {
    let messageView = null
    if (this.state.message) {
      return this.renderView()
    }

    return messageView
  }
}
