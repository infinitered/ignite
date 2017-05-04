/**
 * Fetches plugin registry from Github
 *
 * @param {Object} context The gluegun context.
 */

module.exports = async function (context) {
  const api = context.http.create({
    baseURL: 'https://raw.githubusercontent.com/infinitered/ignite-plugins'
  })

  const { data } = await api.get('/master/registry.json')
  return data
}
