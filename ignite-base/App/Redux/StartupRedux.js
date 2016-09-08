import { createTypes } from 'reduxsauce'

/* ------------- Action Types ------------- */

export const StartupTypes = createTypes('STARTUP')

/* ------------- Action Creators ------------- */

export default {
  startup: () => ({ type: StartupTypes.STARTUP })
}
