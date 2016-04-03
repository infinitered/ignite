/**
  Creates a reducer.
  @param {string} initialState - The initial state for this reducer.
  @param {object} handlers - Keys are action types (strings), values are reducers (functions).
  @return {object} A reducer object.
 */
export default (initialState = null, handlers = {}) => (state = initialState, action) => {
  if (!action && !action.type) return state
  const handler = handlers[action.type]
  return handler && handler(state, action) || state
}
