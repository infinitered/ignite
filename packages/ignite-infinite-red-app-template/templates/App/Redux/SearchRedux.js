import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'

const LIST_DATA = ['sausage', 'blubber', 'pencil', 'cloud', 'moon', 'water', 'computer', 'school',
  'network', 'hammer', 'walking', 'violently', 'mediocre', 'literature', 'chair', 'two', 'window',
  'cords', 'musical', 'zebra', 'xylophone', 'penguin', 'home', 'dog', 'final', 'ink', 'teacher', 'fun',
  'website', 'banana', 'uncle', 'softly', 'mega', 'ten', 'awesome', 'attatch', 'blue', 'internet', 'bottle',
  'tight', 'zone', 'tomato', 'prison', 'hydro', 'cleaning', 'telivision', 'send', 'frog', 'cup', 'book',
  'zooming', 'falling', 'evily', 'gamer', 'lid', 'juice', 'moniter', 'captain', 'bonding', 'loudly', 'thudding',
  'guitar', 'shaving', 'hair', 'soccer', 'water', 'racket', 'table', 'late', 'media', 'desktop', 'flipper',
  'club', 'flying', 'smooth', 'monster', 'purple', 'guardian', 'bold', 'hyperlink', 'presentation', 'world', 'national',
  'comment', 'element', 'magic', 'lion', 'sand', 'crust', 'toast', 'jam', 'hunter', 'forest', 'foraging',
  'silently', 'tawesomated', 'joshing', 'pong', 'RANDOM', 'WORD'
]

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  search: ['searchTerm'],
  cancelSearch: null
})

export const TemperatureTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  searchTerm: '',
  searching: false,
  results: LIST_DATA
})

/* ------------- Reducers ------------- */

export const performSearch = (state, { searchTerm }) => {
  const results = filter(startsWith(searchTerm), LIST_DATA)
  return state.merge({ searching: true, searchTerm, results })
}

export const cancelSearch = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH]: performSearch,
  [Types.CANCEL_SEARCH]: cancelSearch
})
