import { watchStartup } from './StartupSaga'
import { watchLoginAttempt } from './LoginSaga'
import { watchWeatherRequest } from './WeatherSaga'

// start the daemons
export default [
  watchStartup,
  watchLoginAttempt,
  watchWeatherRequest
]
