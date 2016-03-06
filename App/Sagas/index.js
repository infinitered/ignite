import { watchStartup } from './StartupSaga'
import { watchLoginAttempt } from './LoginSaga'

// start the daemons
export default [
  watchStartup,
  watchLoginAttempt
]
