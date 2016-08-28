const Reactotron = require('reactotron-react-native').default
const errorPlugin = require('reactotron-react-native').trackGlobalErrors
const apisaucePlugin = require('reactotron-apisauce')

if (__DEV__) {
  Reactotron
    .configure({
      // host: '10.0.3.2' // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
      name: 'Ignite App' // would you like to see your app's name?
    })

    // forward all errors to Reactotron
    .use(errorPlugin({
      // ignore all error frames from react-native (for example)
      veto: (frame) =>
        frame.fileName.indexOf('/node_modules/react-native/') >= 0
    }))

    // register apisauce so we can install a monitor later
    .use(apisaucePlugin())

    // let's connect!
    .connect()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
} else {
  // a mock version should you decide to leave console.tron in your codebase
  console.tron = {
    log: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false
  }
}
