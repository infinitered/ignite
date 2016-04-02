import chai from 'chai'
import chaiImmutable from 'chai-immutable'

chai.use(chaiImmutable)
global.expect = chai.expect
global.__DEV__ = true
