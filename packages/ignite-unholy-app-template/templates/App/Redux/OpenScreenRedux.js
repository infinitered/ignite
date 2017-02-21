import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openScreen: ['screen', 'options']
})

export const OpenScreenTypes = Types
export default Creators
