// An All Components Screen is a great way to dev and quick-test components
import React, { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../Styles/AllComponentsScreenStyle'
import ProgressiveImage from '../Components/ProgressiveImage'
import { Images } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'

export default class AllComponentsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handlePressLogout = this.handlePressLogout.bind(this)
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    loggedIn: React.PropTypes.bool,
    dispatch: React.PropTypes.func
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
      <View style={ styles.loginBox }>
        <TouchableOpacity onPress={ this.handlePressLogin }>
          <View style={ styles.loginButton }>
            <Text style={ styles.loginText }>Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderLogoutButton () {
    return (
      <View style={ styles.loginBox }>
        <TouchableOpacity onPress={ this.handlePressLogout }>
          <View style={ styles.loginButton }>
            <Text style={ styles.loginText }>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const { loggedIn } = this.props
    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.componentLabel}>Login/Logout Redux + Sagas Example</Text>
        { loggedIn ? this.renderLogoutButton() : this.renderLoginButton() }
        <Text style={styles.componentLabel}>Progressive Image Component</Text>
        <ProgressiveImage
          style={styles.progressiveImage}
          defaultSource={Images.logo}
          source='https://upload.wikimedia.org/wikipedia/commons/c/cc/ESC_large_ISS022_ISS022-E-11387-edit_01.JPG'
          thumbnail='http://i.imgur.com/eVAFUhj.png'
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.username !== null
  }
}

export default connect(mapStateToProps)(AllComponentsScreen)
