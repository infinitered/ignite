import mockery from 'mockery'
import m from 'module'

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

// mock i18n as it uses react native stufff
mockery.registerMock('react-native-i18n', {
  t: (key) => key
})

// Mock all images for React Native
const originalLoader = m._load
m._load = (request, parent, isMain) => {
  if (request.match(/.jpeg|.jpg|.png|.gif$/)) {
    return { uri: request }
  }

  return originalLoader(request, parent, isMain)
}
