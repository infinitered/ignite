import mockery from 'mockery'

// inject __DEV__ as it is not available when running through the tests
global.__DEV__ = true

// We enable mockery and leave it on.  This is a little different than what
// I've seen setup.
mockery.enable()

// Silence the warnings when *real* modules load... this is a change from
// the norm.  We want to opt-in instead of opt-out because not everything
// will be mocked.
mockery.warnOnUnregistered(false)

// mock the images so the tests can load them
mockery.registerMock('../Images/ir.png', 0)
mockery.registerMock('../Images/top_logo.png', 0)
mockery.registerMock('../Images/ignite_logo.png', 0)
mockery.registerMock('../Images/tile_bg.png', 0)
mockery.registerMock('../Images/BG.png', 0)
