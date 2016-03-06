import { describe, it } from 'mocha'
import { expect } from 'chai'
import reducer from '../../App/Reducers/LoginReducer'
import Types from '../../App/Actions/Types'

describe('Login Reducer - LOGIN_ATTEMPT', () => {
  const action = { type: Types.LOGIN_ATTEMPT }
  const actual = reducer(undefined, action)
  it('has the right values', () => {
    expect(actual.attempting).to.be.true
  })
})

describe('Login Reducer - LOGIN_SUCCESS', () => {
  const action = { type: Types.LOGIN_SUCCESS, username: 'steve' }
  const actual = reducer(undefined, action)
  it('has the right values', () => {
    expect(actual.attempting).to.be.false
    expect(actual.username).to.equal('steve')
    expect(actual.errorCode).to.be.null
  })
})

describe('Login Reducer - LOGIN_FAILURE', () => {
  const action = { type: Types.LOGIN_FAILURE, errorCode: 123 }
  const actual = reducer(undefined, action)
  it('has the right values', () => {
    expect(actual.attempting).to.be.false
    expect(actual.errorCode).to.equal(123)
  })
})

describe('Login Reducer - LOGOUT', () => {
  const action = { type: Types.LOGOUT }
  const actual = reducer(undefined, action)
  it('has the right values', () => {
    expect(actual.username).to.be.null
  })
})
