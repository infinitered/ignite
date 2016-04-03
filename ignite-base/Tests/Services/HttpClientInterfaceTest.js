import { describe, it } from 'mocha'
import { expect } from 'chai'
import Client from '../../App/Services/HttpClient'
import R from 'ramda'

describe('HttpClient Interface', () => {
  const client = Client()

  it('has a .get', () => {
    const method = R.type(client.get)
    expect(method).to.equal('Function')
  })

  it('has a .post', () => {
    const method = R.type(client.post)
    expect(method).to.equal('Function')
  })

  it('has a .patch', () => {
    const method = R.type(client.patch)
    expect(method).to.equal('Function')
  })

  it('has a .delete', () => {
    const method = R.type(client.delete)
    expect(method).to.equal('Function')
  })

  it('has a .put', () => {
    const method = R.type(client.put)
    expect(method).to.equal('Function')
  })

  it('has a .head', () => {
    const method = R.type(client.head)
    expect(method).to.equal('Function')
  })
})
