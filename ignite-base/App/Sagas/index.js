import API from '../Services/Api'
import { watchStartup } from './StartupSaga'
import { watchLoginAttempt } from './LoginSaga'
import getCityWeather from './GetCityWeatherSaga'

// Create our API at this level and feed it into
// the sagas that are expected to make API calls
// so there's only 1 copy app-wide!
const api = API.create()

// start the daemons
export default [
  watchStartup,
  watchLoginAttempt,
  getCityWeather(api).watcher
]
