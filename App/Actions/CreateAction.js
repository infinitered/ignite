/**
  Creates an action.
  @param {string} type - The type of action.
  @param {object} params - The rest of the properties of the action.
  @return {object} The assembled action object.
 */
export default (type, params = null) => ({ type, ...params })
