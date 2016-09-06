import { createTypes } from 'reduxsauce'

/* ------------- Action Types ------------- */

export const Types = createTypes('STARTUP')

/* ------------- Action Creators ------------- */

export const Actions = {
  startup: () => ({ type: Types.STARTUP })
}
