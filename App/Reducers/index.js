import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'

// glue all the reducers together into 1 root reducer
export default combineReducers({
  login: LoginReducer
})
