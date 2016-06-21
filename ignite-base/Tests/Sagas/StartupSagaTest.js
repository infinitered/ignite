import test from 'ava'
import { take } from 'redux-saga/effects'
import { watchStartup } from '../../App/Sagas/StartupSaga'
import Types from '../../App/Actions/Types'

const stepper = (fn) => (mock) => fn.next(mock).value

test('watches for the right action', t => {
  const step = stepper(watchStartup())
  t.deepEqual(step(), take(Types.STARTUP))
})
