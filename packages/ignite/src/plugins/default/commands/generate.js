// @cliDescription Generates some files.
// @cliAlias g
// ----------------------------------------------------------------------------

const {
  prop,
  groupBy,
  map,
  flatten,
  pipe,
  find,
  propEq,
  mapObjIndexed,
  equals,
  isNil,
  values,
  replace,
  trim
} = require('ramda')
const { dotPath } = require('ramdasauce')
const header = require('../../../brand/header')

/**
 * Runs a generator.
 *
 * @params {RunContext} context The environment.
 */
module.exports = async function (context) {
  // grab some features
  const { ignite, config, print, parameters } = context

  // little bit of branding
  header()
  print.newline()

  // keys are type of generate and values are a list of options...
  const registry = pipe(
    map(
      plugin => map(
        type => ({ type, plugin, command: find(propEq('name', type), plugin.commands) }),
        dotPath('ignite.generators', plugin) || []
      )
    ),
    flatten,
    groupBy(prop('type'))
  )(ignite.findIgnitePlugins())

  // ---------------------
  // NOTE(steve): Saving these next two for potential useful stuff

  // the plugins with only 1 slot registered per type
  // const unique = pipe(
  //   pickBy(v => v.length === 1),
  //   map(head)
  // )(registry)

  // the plugins that are competing for slots
  // const many = pickBy(v => v.length > 1, registry)
  // ---------------------

  // the list of what the user wants
  const userPrefs = dotPath('ignite.generators', config) || {}

  // find the exact match of plugin name & type
  const userRegistry = mapObjIndexed(
    (pluginName, type) => {
      // let's find what the user has asked for in the list
      const lookup = find(
        option => equals(pluginName, dotPath('plugin.name', option)),
        registry[type] || []
      )

      // figure out a friendly error to show the user
      let error = null
      let description = null
      if (isNil(lookup)) {
        error = 'missing'
      } else if (isNil(lookup.command)) {
        error = 'missing command'
      } else if (lookup.plugin.errorState !== 'none') {
        error = `command ${lookup.plugin.errorState}`
      } else if (lookup.command.errorState !== 'none') {
        error = `command ${lookup.command.errorState}`
      } else {
        description = lookup.command.description
      }

      // what our new list will look like
      return {
        type,
        pluginName,
        error,
        description,
        plugin: lookup ? lookup.plugin : null,
        command: lookup ? lookup.command : null
      }
    },
    userPrefs
  )

  // TODO: do we want to add items that aren't conflicts it the list?

  // TODO: how do we want to handle conflicts?  up above, i'm just calling find()

  // the type of template to generate (it's actually the 2nd because we rewrite the pluginName to be first)
  const type = parameters.second
  const registryItem = type ? userRegistry[type] : null

  // didn't find what we wanted?
  if (isNil(registryItem)) {
    // turn into data we can print
    const data = pipe(
      values,
      map(item => [
        item.type,
        item.error || item.description,
        print.colors.muted(item.pluginName)
      ])
    )(userRegistry)

    // and print it
    print.table(data)

    return
  }

  // swap out the old command for the new one, keeping the same parameters
  const rx = new RegExp('^' + parameters.first, 'g')
  const newCommand = trim(replace(rx, '', parameters.string))

  // make the call to the real generator
  context.runtime.run({
    pluginName: registryItem.pluginName,
    rawCommand: newCommand,
    options: parameters.options
  }).then((e) => {
    if (e.error) {
      print.debug(e.error)
    }
  })
}
