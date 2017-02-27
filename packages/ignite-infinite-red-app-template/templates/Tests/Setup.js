import mockery from 'mockery'
import m from 'module'
import english from '../App/I18n/languages/english.json'
import {keys, replace, forEach} from 'ramda'

// inject __DEV__ as it is not available when running through the tests
global.__DEV__ = true

// We enable mockery and leave it on.
mockery.enable()

// Silence the warnings when *real* modules load... this is a change from
// the norm.  We want to opt-in instead of opt-out because not everything
// will be mocked.
mockery.warnOnUnregistered(false)

// Mock any libs that get called in here
// I'm looking at you react-native-router-flux, reactotron etc!
mockery.registerMock('reactotron-react-native', {})
mockery.registerMock('reactotron-redux', {})
mockery.registerMock('reactotron-apisauce', {})
mockery.registerMock('react-native-animatable', {View: 'Animatable.View'})
mockery.registerMock('react-native-vector-icons/Ionicons', {})
mockery.registerMock('react-native-router-flux', {Actions: {'myScreen': () => {}}, ActionConst: {RESET: 'reset'}})

// Mock i18n as it uses react native stuff
// This mock returns the interpolated text from the english.json file in App/I18n
// If you are not using '../App/I18n/english.json' for your I18n values, simply replace import english
// with the import at the top of this file from '../App/I18n/english.json' with the I18n json file you
// want to use, such as "import french from '../App/I18n/fr.json'" and set 'let value = french[key]`
mockery.registerMock('react-native-i18n', {
  t: (key, replacements) => {
    let value = english[key]
    if (!value) return key
    if (!replacements) return value

    forEach((r) => {
      value = replace(`{{${r}}}`, replacements[r], value)
    }, keys(replacements))
    return value
  }
})

// Mock all images for React Native
const originalLoader = m._load
m._load = (request, parent, isMain) => {
  if (request.match(/.jpeg|.jpg|.png|.gif$/)) {
    return { uri: request }
  }

  return originalLoader(request, parent, isMain)
}
