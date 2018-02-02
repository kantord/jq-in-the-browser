import parser from './jq.js'
import assert from 'assert'
const jq_web = require('jq-web')
const node_jq = require('node-jq')
import { tests_jq_web, tests_node_jq } from './test_spec.js'

tests_jq_web.forEach(([feature, queries, inputs]) => {
  describe(feature, () =>
    queries.forEach((query) =>
      describe(`Query: ${query}`, () => {
        inputs.forEach((input) => {
          it(`Input: ${JSON.stringify(input)}`, () => {
            const parser_result = parser(query)(input)
            const jq_result = jq_web(input, query)
            assert.deepEqual(parser_result, jq_result)
          })
        })
      })
    )
  )
})

tests_node_jq.forEach(([feature, queries, inputs]) => {
  describe(feature, () =>
    queries.forEach((query) =>
      describe(`Query: ${query}`, () => {
        inputs.forEach((input) => {
          it(`Input: ${JSON.stringify(input)}`, async () => {
            const parser_result = parser(query)(input)
            const jq_result = await node_jq.run(query, input, {input: 'json', output: 'json'})
            assert.deepEqual(parser_result, jq_result)
          })
        })
      })
    )
  )
})


describe('Single quote String literal', () => {
  it('per se', () => {
    assert.equal(parser("'Hello \"World\"!'")(null), 'Hello "World"!')
  })

  it('as key', () => {
    assert.deepEqual(parser("{'a': false}")(null), {'a': false})
  })
})
