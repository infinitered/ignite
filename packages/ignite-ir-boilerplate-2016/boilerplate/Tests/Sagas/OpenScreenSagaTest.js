import test from 'ava'
import { call } from 'redux-saga/effects'
import { openScreen } from '../../App/Sagas/OpenScreenSagas'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

const stepper = (fn) => (mock) => fn.next(mock).value

// Using 'myScreen' in the mocks of the arguments passed to the action for these tests is important.
// The react-native-router-flux component is mocked in App/Tests/Setup.js to use 'myScreen'

test('the right default options are passed to the navigation action', (t) => {
  const mock = {screen: 'myScreen'}
  const step = stepper(openScreen(mock))
  t.deepEqual(step(), call(NavigationActions['myScreen'], {type: ActionConst.RESET}))
})

test('the right merged options are passed to the navigation action', (t) => {
  const mock = {screen: 'myScreen', options: {type: 'replace', foo: 'bar'}}
  const step = stepper(openScreen(mock))
  t.deepEqual(step(), call(NavigationActions['myScreen'], {type: 'replace', foo: 'bar'}))
})
