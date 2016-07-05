import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import { Colors, Images, Metrics } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
// Enable when you have configured Xcode
// import PushNotification from 'react-native-push-notification'
import I18n from '../I18n/I18n.js'

// Styles
import styles from './Styles/UsageExamplesScreenStyle'

class UsageExamplesScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handlePressLogout = this.handlePressLogout.bind(this)
    this.handlePressRocket = this.handlePressRocket.bind(this)
    this.handlePressSend = this.handlePressSend.bind(this)
    this.handlePressStar = this.handlePressStar.bind(this)
    this.handlePressListview = this.handlePressListview.bind(this)
    this.handlePressListviewGrid = this.handlePressListviewGrid.bind(this)
    this.handlePressMapview = this.handlePressMapview.bind(this)
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    temperature: PropTypes.number,
    city: PropTypes.string
  }

  componentWillReceiveProps (nextProps) {
    // Request push premissions only if the user has logged in.
    const { loggedIn } = nextProps
    if (loggedIn) {
      /*
      * If you have turned on Push in Xcode, http://i.imgur.com/qFDRhQr.png
      * uncomment this code below and import at top
      */
      // if (__DEV__) console.log('Requesting push notification permissions.')
      // PushNotification.requestPermissions()
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

  handlePressListview () {
    const { navigator } = this.props
    const route = Routes.ListviewExample
    navigator.push(route)
  }

  handlePressListviewGrid () {
    const { navigator } = this.props
    const route = Routes.ListviewGridExample
    navigator.push(route)
  }

  handlePressMapview () {
    const { navigator } = this.props
    const route = Routes.MapviewExample
    navigator.push(route)
  }

  renderLoginButton () {
    return (
      <RoundedButton onPress={this.handlePressLogin}>
        {I18n.t('signIn')}
      </RoundedButton>
    )
  }

  renderLogoutButton () {
    return (
      <RoundedButton onPress={this.handlePressLogout}>
        {I18n.t('logOut')}
      </RoundedButton>
    )
  }

  renderHeader (title) {
    return (
      <View style={styles.componentLabelContainer}>
        <Text style={styles.componentLabel}>{title}</Text>
      </View>
    )
  }

  renderUsageExamples () {
    const { loggedIn, temperature, city } = this.props
    return (
      <View>
        {this.renderHeader(I18n.t('loginLogoutExampleTitle'))}
        {loggedIn ? this.renderLogoutButton() : this.renderLoginButton()}
        {this.renderHeader('I18n Locale')}
        <View style={styles.groupContainer}>
          <Text style={styles.locale}>{I18n.locale}</Text>
        </View>
        {this.renderHeader(I18n.t('api') + `: ${city}`)}
        <View style={[styles.groupContainer, {height: 50}]}>
          <Text style={styles.temperature}>{temperature && `${temperature} ${I18n.t('tempIndicator')}`}</Text>
        </View>
        {this.renderHeader(I18n.t('rnVectorIcons'))}
        <View style={styles.groupContainer}>
          <TouchableOpacity onPress={this.handlePressRocket}>
            <Icon name='rocket' size={Metrics.icons.medium} color={Colors.ember} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePressSend}>
            <Icon name='send' size={Metrics.icons.medium} color={Colors.error} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePressStar}>
            <Icon name='star' size={Metrics.icons.medium} color={Colors.snow} />
          </TouchableOpacity>
          <Icon name='trophy' size={Metrics.icons.medium} color={Colors.error} />
          <Icon name='warning' size={Metrics.icons.medium} color={Colors.ember} />
        </View>
        <View style={styles.groupContainer}>
          <Icon.Button name='facebook' style={styles.facebookButton} backgroundColor={Colors.facebook} onPress={() => window.alert('Facebook')}>
            {I18n.t('loginWithFacebook')}
          </Icon.Button>
        </View>
        {this.renderHeader(I18n.t('rnAnimatable'))}
        <View style={styles.groupContainer}>
          <Animatable.Text animation='fadeIn' iterationCount='infinite' direction='alternate' style={styles.subtitle}>{I18n.t('rnAnimatable')}</Animatable.Text>
          <Animatable.Image animation='pulse' iterationCount='infinite' source={Images.logo} />
          <Animatable.View animation='jello' iterationCount='infinite' >
            <Icon name='cab' size={Metrics.icons.medium} color={Colors.snow} />
          </Animatable.View>
        </View>
        {this.renderHeader(I18n.t('igniteGenerated'))}
        <View>
          <RoundedButton text='Listview' onPress={this.handlePressListview} />
        </View>
        <View>
          <RoundedButton text='Listview Grid' onPress={this.handlePressListviewGrid} />
        </View>
        <View>
          <RoundedButton text='Mapview' onPress={this.handlePressMapview} />
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText} >
              The Usage Examples screen is a playground for 3rd party libs and logic proofs.
              Items on this screen can be composed of multiple components working in concert.  Functionality demos of libs and practices
            </Text>
          </View>
          {this.renderUsageExamples()}
        </ScrollView>
      </View>
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
