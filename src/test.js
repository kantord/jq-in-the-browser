import parser from './jq.js'
import assert from 'assert'
const jq = require('node-jq')

var tests = [
  ['.', [
    [4], {'foo': 'bar'}
  ]],
]

tests.forEach(([query, inputs]) => {
  describe(`Query: ${query}`, () => {
    inputs.forEach((input) => {
      it(`Input: ${JSON.stringify(input)}`, async () => {
        const parser_result = parser(query)(input)
        const jq_result = await jq.run(query, input, { input: 'json', output: 'json' })
        assert.deepEqual(parser_result, jq_result)
      })
    })
  })
})
