import assert from 'assert'
import parser from './jq.js'

describe('Single quote String literal', () => {
  it('per se', () => {
    assert.equal(parser("'Hello \"World\"!'")(null), 'Hello "World"!')
  })

  it('as key', () => {
    assert.deepEqual(parser("{'a': false}")(null), {'a': false})
  })
})
