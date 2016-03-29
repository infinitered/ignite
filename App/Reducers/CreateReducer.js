import Immutable from 'seamless-immutable'

/**
  Creates a reducer.
  @param {string} initialState - The initial state for this reducer.
  @param {object} handlers - Keys are action types (strings), values are reducers (functions).
  @return {object} A reducer object.
 */
export default (initialState = null, handlers = {}) => (state = initialState, action) => {
  if (!action && !action.type) return state
  const handler = handlers[action.type]

  // Check to see if the state is already Immutable
  if (state && typeof state.asMutable === 'function') {
    return handler && handler(state, action) || state
  } else {
    return handler && handler(Immutable(state), action) || Immutable(state)
  }
}
