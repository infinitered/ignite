import React, {
  Component,
  PropTypes,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Styles from '../Styles/LoginScreenStyle'
import Actions from '../Actions/Creators'

class LoginScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      username: 'reactnative@infinite.red',
      password: 'password',
    }
    this.isAttempting = false
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handlePressCancel = this.handlePressCancel.bind(this)
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    if (this.isAttempting && !newProps.attempting) {
      this.props.navigator.pop()
    }
  }

  handlePressLogin () {
    const { username, password } = this.state
    const { dispatch } = this.props
    this.isAttempting = true
    // kick off a login
    dispatch(Actions.attemptLogin(username, password))
    // pretend this is correct
    setTimeout(() => {
      dispatch(Actions.loginSuccess(username))
    }, 1000)
  }

  handlePressCancel () {
    const { navigator } = this.props
    navigator.pop()
  }

  handleChangeUsername (text) {
    this.setState({ username: text })
  }

  handleChangePassword (text) {
    this.setState({ password: text })
  }

  render () {
    const { username, password } = this.state
    const { attempting } = this.props
    const editable = !attempting
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <View style={ Styles.container }>
        <View style={ Styles.form }>
          <View style={ Styles.row }>
            <Text style={ Styles.rowLabel }>Username</Text>
            <TextInput
              ref='username'
              style={ textInputStyle }
              value={ username }
              autoFocus
              editable={ editable }
              keyboardType='default'
              returnKeyType='search'
              onChangeText={ this.handleChangeUsername }
              placeholder='Username' />
          </View>

          <View style={ Styles.row }>
            <Text style={ Styles.rowLabel }>Password</Text>
            <TextInput
              ref='password'
              style={ textInputStyle }
              value={ password }
              editable={ editable }
              keyboardType='default'
              returnKeyType='search'
              secureTextEntry
              onChangeText={ this.handleChangePassword }
              placeholder='Password' />
          </View>

          <View style={ [Styles.loginRow] }>
            <TouchableOpacity style={ Styles.loginButtonWrapper } onPress={ this.handlePressLogin }>
              <View style={ Styles.loginButton }>
                <Text style={ Styles.loginText }>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={ Styles.loginButtonWrapper } onPress={ this.handlePressCancel }>
              <View style={ Styles.loginButton }>
                <Text style={ Styles.loginText }>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }

}

LoginScreen.propTypes = {
  dispatch: PropTypes.func,
  navigator: PropTypes.object,
  attempting: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    attempting: state.login.attempting
  }
}

export default connect(mapStateToProps)(LoginScreen)

