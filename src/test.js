import parser from './jq.js'
import assert from 'assert'
const jq = require('node-jq')

const fixtures = [
  {'foo': [3, 1], 'bar': {'x': 3, 'y': .5}, '2bar': null, 'a b': 0},
  {'foo': [4, 1], 'bar': {'x': 3, 'y': .5}, '2bar': 1, 'a b': 'a b'},
]

const tests = [
  ['Identity', ['.'], [
    [4], {'foo': 'bar'}
  ]],

  ['Array Index', ['.[0]', '.[1]', '.[-1]', '.[1][0]', '.[1][1].x', '.[1][1].x[0]'], [
    [0, [1, {'x': ['y']}]], [1, [1, {'x': [-1.1]}], 3]
  ]],

  ['Object Identifier-Index', ['.foo', '.bar', '.bar.x', '.foo[1]'], [
    fixtures[0], fixtures[1],
  ]],

  ['Generic Object Index', ['.["foo"]', '.["bar"].x', '.bar["y"]', '.["2bar"]', '.["a b"]'], [
    fixtures[0], fixtures[1],
  ]]
]

tests.forEach(([feature, queries, inputs]) => {
  describe(feature, () =>
    queries.forEach((query) =>
      describe(`Query: ${query}`, () => {
        inputs.forEach((input) => {
          it(`Input: ${JSON.stringify(input)}`, async () => {
            const parser_result = parser(query)(input)
            const jq_result = await jq.run(query, input, { input: 'json', output: 'json' })
            assert.deepEqual(parser_result, jq_result)
          })
        })
      })
    )
  )
})
