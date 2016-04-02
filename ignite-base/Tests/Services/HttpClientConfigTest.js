import { describe, it } from 'mocha'
import { expect } from 'chai'
import Client from '../../App/Services/HttpClient'

describe('HttpClient Logging', () => {
  it('logging is off by default', () => {
    expect(Client().logging).to.be.false
  })

  it('logging can be turned on', () => {
    const client = Client({ logging: true })
    expect(client.logging).to.be.true
  })
})

describe('HttpClient Base URL', () => {
  it('can set a base url', () => {
    const baseUrl = 'http://api.infinite.red'
    const client = Client({ baseUrl })
    expect(client.baseUrl).to.equal(baseUrl)
  })
})

describe('HttpClient Headers', () => {
  it('can set headers', () => {
    const headers = { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
    const client = Client({ headers })
    expect(client.headers).to.equal(headers)
  })
})
