import parser from './jq.js'
import assert from 'assert'
const jq_web = require('jq-web')
const node_jq = require('node-jq')

const test_with_node_jq = ([feature, queries, inputs]) => {
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
}

const test_with_jq_web = ([feature, queries, inputs]) => {
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
}

export { test_with_jq_web, test_with_node_jq }
