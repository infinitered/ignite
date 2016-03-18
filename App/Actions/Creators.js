import createAction from './CreateAction'
import Types from './Types'

const attemptLogin = (username, password) =>
  createAction(Types.LOGIN_ATTEMPT, { username, password })

const loginSuccess = (username) =>
  createAction(Types.LOGIN_SUCCESS, { username })

const loginFailure = (errorCode) =>
  createAction(Types.LOGIN_FAILURE, { errorCode })

const logout = () => createAction(Types.LOGOUT)

const startup = () => createAction(Types.STARTUP)

const requestTemperature = (city) => createAction(Types.TEMPERATURE_REQUEST, { city })
const receiveTemperature = (temperature) => createAction(Types.TEMPERATURE_RECEIVE, { temperature })
const receiveTemperatureFailure = () => createAction(Types.TEMPERATURE_FAILURE)

/**
 Makes available all the action creators we've created.
 */
export default {
  attemptLogin,
  loginSuccess,
  loginFailure,
  logout,
  startup,
  requestTemperature,
  receiveTemperature,
  receiveTemperatureFailure
}
