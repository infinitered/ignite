import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import { Colors, Images, Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
import PushNotification from 'react-native-push-notification'
import I18n from '../I18n/I18n.js'

// Styles
import styles from './Styles/UsageExamplesScreenStyle'

export default class UsageExamplesScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handlePressLogout = this.handlePressLogout.bind(this)
    this.handlePressRocket = this.handlePressRocket.bind(this)
    this.handlePressSend = this.handlePressSend.bind(this)
    this.handlePressStar = this.handlePressStar.bind(this)
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    temperature: PropTypes.number,
    city: PropTypes.string
  }

  componentWillReceiveProps (nextProps) {
    // Request premissions only if the user has logged in.
    const { loggedIn } = nextProps
    if (loggedIn) {
      if (__DEV__) console.log('Requesting push notification permissions.')
      PushNotification.requestPermissions()
    }
  }

  // fires when the user presses the login button
  handlePressLogin () {
    const { navigator } = this.props
    const route = Routes.LoginScreen
    navigator.push(route)
  }

  // fires when the user presses the logout button
  handlePressLogout () {
    const { dispatch } = this.props
    dispatch(Actions.logout())
  }

  // fires when we tap the rocket!
  handlePressRocket () {
    const {dispatch} = this.props
    dispatch(Actions.requestTemperature('Boise'))
  }

  // fires when tap send
  handlePressSend () {
    const {dispatch} = this.props
    dispatch(Actions.requestTemperature('Toronto'))
  }

  // fires when tap star
  handlePressStar () {
    const {dispatch} = this.props
    dispatch(Actions.requestTemperature('New Orleans'))
  }

  renderLoginButton () {
    return (
      <View style={styles.loginBox}>
        <TouchableOpacity onPress={this.handlePressLogin}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>{I18n.t('signIn')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderLogoutButton () {
    return (
      <View style={styles.loginBox}>
        <TouchableOpacity onPress={this.handlePressLogout}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>{I18n.t('logOut')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderUsageExamples () {
    const { loggedIn, temperature, city } = this.props
    return (
      <View>
        <Text style={styles.componentLabel}>{I18n.t('loginLogoutExampleTitle')}</Text>
        {loggedIn ? this.renderLogoutButton() : this.renderLoginButton()}
        <Text style={styles.componentLabel}>I18n Locale</Text>
        <View style={styles.groupContainer}>
          <Text style={styles.locale}>{I18n.locale}</Text>
        </View>
        <Text style={styles.componentLabel}>{I18n.t('api')}: {city}</Text>
        <View style={[styles.groupContainer, {height: 50}]}>
          <Text style={styles.temperature}>{temperature && `${temperature} ${I18n.t('tempIndicator')}`}</Text>
        </View>
        <Text style={styles.componentLabel}>{I18n.t('rnVectorIcons')}</Text>
        <View style={styles.groupContainer}>
          <TouchableOpacity onPress={this.handlePressRocket}>
            <Icon name='rocket' size={Metrics.icons.medium} color={Colors.error} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePressSend}>
            <Icon name='send' size={Metrics.icons.medium} color={Colors.error} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePressStar}>
            <Icon name='star' size={Metrics.icons.medium} color={Colors.error} />
          </TouchableOpacity>
          <Icon name='trophy' size={Metrics.icons.medium} color={Colors.error} />
          <Icon name='warning' size={Metrics.icons.medium} color={Colors.error} />
        </View>
        <View style={styles.groupContainer}>
          <Icon.Button name='facebook' style={styles.facebookButton} backgroundColor={Colors.facebook} onPress={() => window.alert('Facebook')}>
            {I18n.t('loginWithFacebook')}
          </Icon.Button>
        </View>
        <Text style={styles.componentLabel}>{I18n.t('rnAnimatable')}</Text>
        <View style={styles.groupContainer}>
          <Animatable.Text animation='fadeIn' iterationCount='infinite' direction='alternate'>{I18n.t('rnAnimatable')}</Animatable.Text>
          <Animatable.Image animation='pulse' iterationCount='infinite' source={Images.logo} />
          <Animatable.View animation='jello' iterationCount='infinite'>
            <Icon name='cab' size={Metrics.icons.medium} />
          </Animatable.View>
        </View>
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.subtitle} >Functionality demos of libs and practices</Text>
        </View>
        {this.renderUsageExamples()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.username !== null,
    temperature: state.weather.temperature,
    city: state.weather.city
  }
}

export default connect(mapStateToProps)(UsageExamplesScreen)
