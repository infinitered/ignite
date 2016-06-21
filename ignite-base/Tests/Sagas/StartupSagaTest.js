import test from 'ava'
import { take } from 'redux-saga/effects'
import { watchStartup } from '../../App/Sagas/StartupSaga'
import Types from '../../App/Actions/Types'

test('watches for the right action', t => {
  const gen = watchStartup()
  const next = (mock) => gen.next(mock).value
  t.deepEqual(next(), take(Types.STARTUP))
})
