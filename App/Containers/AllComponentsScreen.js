// An All Components Screen is a great way to dev and quick-test components
import React, { View, ScrollView, Text, TouchableOpacity, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import styles from '../Styles/AllComponentsScreenStyle'
import ProgressiveImage from '../Components/ProgressiveImage'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AllComponentsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handlePressLogout = this.handlePressLogout.bind(this)
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    temperature: PropTypes.number,
    city: PropTypes.string
  };

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

  renderLoginButton () {
    return (
      <View style={styles.loginBox}>
        <TouchableOpacity onPress={this.handlePressLogin}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>Sign In</Text>
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
            <Text style={styles.loginText}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const { loggedIn, temperature, city } = this.props
    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.componentLabel}>Login/Logout Redux + Sagas Example</Text>
        {loggedIn ? this.renderLogoutButton() : this.renderLoginButton()}
        <Text style={styles.componentLabel}>Progressive Image Component</Text>
        <ProgressiveImage
          style={styles.progressiveImage}
          defaultSource={Images.logo}
          source='https://upload.wikimedia.org/wikipedia/commons/c/cc/ESC_large_ISS022_ISS022-E-11387-edit_01.JPG'
          thumbnail='http://i.imgur.com/eVAFUhj.png'
        />
        <Text style={styles.componentLabel}>Http Client: {city}</Text>
        <Text style={styles.temperature}>{temperature && `${temperature} F`}</Text>
        <Text style={styles.componentLabel}>RN Vector Icons</Text>
        <View style={styles.buttonContainer}>
          <Icon name='rocket' size={Metrics.icons.medium} color={Colors.error} />
          <Icon name='send' size={Metrics.icons.medium} color={Colors.error} />
          <Icon name='star' size={Metrics.icons.medium} color={Colors.error} />
          <Icon name='trophy' size={Metrics.icons.medium} color={Colors.error} />
          <Icon name='warning' size={Metrics.icons.medium} color={Colors.error} />
        </View>
        <View style={styles.buttonContainer}>
          <Icon.Button name='facebook' style={styles.facebookButton} backgroundColor={Colors.facebook} onPress={() => window.alert('Facebook')}>
            Login with Facebook
          </Icon.Button>
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
