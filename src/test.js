import parser from './jq.js'
import should from 'should'

describe("number literals", function() {
  it('0', () => parser('0')(null).should.be(0))
})
