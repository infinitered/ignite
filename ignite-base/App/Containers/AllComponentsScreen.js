// An All Components Screen is a great way to dev and quick-test components
import React, { View, ScrollView, Text, TouchableOpacity, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'
import ProgressiveImage from '../Components/ProgressiveImage'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import PushNotification from 'react-native-push-notification'

// I18n
import I18n from '../I18n/I18n.js'

export default class AllComponentsScreen extends React.Component {

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
  };

  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  componentWillReceiveProps (nextProps) {
    // Request premissions only if the user has logged in.
    const { loggedIn } = nextProps
    if (loggedIn) {
      console.log('Requesting push notification permissions.')
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

  render () {
    const { loggedIn, temperature, city } = this.props
    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.componentLabel}>{I18n.t('loginLogoutExampleTitle')}</Text>
        {loggedIn ? this.renderLogoutButton() : this.renderLoginButton()}
        <Text style={styles.componentLabel}>{I18n.t('progressiveImageComponent')}</Text>
        <ProgressiveImage
          style={styles.progressiveImage}
          defaultSource={Images.logo}
          source='https://upload.wikimedia.org/wikipedia/commons/c/cc/ESC_large_ISS022_ISS022-E-11387-edit_01.JPG'
          thumbnail='http://i.imgur.com/eVAFUhj.png'
        />
        <View style={styles.groupContainer}>
          <ProgressiveImage
            style={styles.smallImage}
            defaultSource={Images.logo}
            source='http://imgur.com/3BaDWGT.png'
            thumbnail='http://imgur.com/3BaDWGT.png'
          />
          <ProgressiveImage
            style={styles.mediumImage}
            defaultSource={Images.logo}
            source='http://imgur.com/HWcqUJJ.jpg'
            thumbnail='http://imgur.com/M07ucqg.png'
          />
          <ProgressiveImage
            style={styles.largeImage}
            defaultSource={Images.logo}
            source='http://imgur.com/LgSAS60.jpg'
            thumbnail='http://imgur.com/l2QQs2R.png'
          />
        </View>
        <Text style={styles.componentLabel}>{I18n.t('api')}: {city}</Text>
        <Text style={styles.temperature}>{temperature && `${temperature} ${I18n.t('tempIndicator')}`}</Text>
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

export default connect(mapStateToProps)(AllComponentsScreen)
