import mockery from 'mockery'

// inject __DEV__ as it is not available when running through the tests
global.__DEV__ = true

// We enable mockery and leave it on.
mockery.enable()

// Silence the warnings when *real* modules load... this is a change from
// the norm.  We want to opt-in instead of opt-out because not everything
// will be mocked.
mockery.warnOnUnregistered(false)

// Let's register some mocks for the images that are brought into our project.
// You'll have to do the same because the React Native packager and babel
// are locked into a horrible custody battle.
mockery.registerMock('reactotron', {})
mockery.registerMock('../Images/ir.png', 0)
mockery.registerMock('../Images/top_logo.png', 0)
mockery.registerMock('../Images/ignite_logo.png', 0)
mockery.registerMock('../Images/tile_bg.png', 0)
mockery.registerMock('../Images/BG.png', 0)

// Add more mocks here.  Mainly images need to be stubbed, however, you might
// find 3rd party libraries need a little bit of love too.  I'm looking at you
// react-native-router-flux.
