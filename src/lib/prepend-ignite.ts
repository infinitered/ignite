/**
 * Ensures the given string starts with 'ignite-'.
 */
export default (value: string): string => {
  const path = require('path')
  // If a path, ignore, it's fine
  if (value.includes(path.sep)) return value

  return /^ignite-/.test(value) ? value : 'ignite-' + value
}
