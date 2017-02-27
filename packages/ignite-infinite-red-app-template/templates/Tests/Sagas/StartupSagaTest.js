import test from 'ava'
import { select, put } from 'redux-saga/effects'
import { selectAvatar, startup } from '../../App/Sagas/StartupSagas'
import GithubActions from '../../App/Redux/GithubRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('watches for the right action', (t) => {
  const step = stepper(startup())
  GithubActions.userRequest('GantMan')
  t.deepEqual(step(), select(selectAvatar))
  t.deepEqual(step(), put(GithubActions.userRequest('GantMan')))
})
