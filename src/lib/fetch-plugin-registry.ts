import { IgniteToolbox } from '../types'

/**
 * Fetches plugin registry from Github
 *
 * @param {Object} toolbox The gluegun toolbox.
 */
export default async function(toolbox: IgniteToolbox): Promise<any> {
  const api = toolbox.http.create({
    baseURL: 'https://raw.githubusercontent.com/infinitered/ignite-plugins',
  })

  const { data } = await api.get('/master/registry.json')
  return data
}
