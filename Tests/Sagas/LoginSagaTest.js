import { describe, it } from 'mocha'
import { expect } from 'chai'
import { take, call, put } from 'redux-saga/effects'
import { attemptLogin, watchLoginAttempt } from '../../App/Sagas/LoginSaga'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

describe('watchLoginAttempt', () => {
  it('listens for the right action type', () => {
    const gen = watchLoginAttempt()
    const actual = gen.next().value
    const expected = take(Types.LOGIN_ATTEMPT)
    expect(actual).to.deep.equal(expected)
  })

  it('calls the saga that does the work', () => {
    const gen = watchLoginAttempt()
    gen.next()
    const mock = { username: 'steve', password: 'password' }
    const actual = gen.next(mock).value
    const expected = call(attemptLogin, mock.username, mock.password)
    expect(actual).to.deep.equal(expected)
  })
})

describe('attemptLogin', () => {
  it('dispatches failure actions', () => {
    const gen = attemptLogin('steve', '')
    gen.next()
    const actual = gen.next().value
    const expected = put(Actions.loginFailure('WRONG'))
    expect(actual).to.deep.equal(expected)
  })

  it('dispatches success actions', () => {
    const gen = attemptLogin('steve', 'password')
    gen.next()
    const actual = gen.next().value
    const expected = put(Actions.loginSuccess('steve'))
    expect(actual).to.deep.equal(expected)
  })
})
