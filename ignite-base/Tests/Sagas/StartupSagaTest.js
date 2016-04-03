import { describe, it } from 'mocha'
import { expect } from 'chai'
import { take } from 'redux-saga/effects'
import { watchStartup } from '../../App/Sagas/StartupSaga'
import Types from '../../App/Actions/Types'

describe('watchStartup', () => {
  it('listens for the STARTUP action type', () => {
    const gen = watchStartup()
    const actual = gen.next().value
    const expected = take(Types.STARTUP)
    expect(actual).to.deep.equal(expected)
  })
})
