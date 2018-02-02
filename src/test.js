import parser from './jq.js'
import assert from 'assert'
const jq_web = require('jq-web')
const node_jq = require('node-jq')

const fixtures = [
  {'foo': [3, 1], 'bar': {'x': 3, 'y': .5}, '2bar': null, 'a b': 0},
  {'foo': [4, 1], 'bar': {'x': 3, 'y': .5}, '2bar': 1, 'a b': 'a b'},
]

const tests_node_jq = [
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
  ]],

  ['Pipe', ['.a | .b', '.a|.b'], [
    {'a': {'b': 4}}, {'a': {'b': 'oo'}},
  ]],

  ['Parentheses', ['(.a)', '((.a))', '(-1)', '(-5.5)', '(.4)', '(. | .)'], [{"a": "a"}, {"a": -5}]],

  ['Addition (numbers)', [
    '1 + 1', '.a + [.b][0]', '.b + .a', '3 + 4.1 + .a', '3 + (-3)',
  ], [{'a': 3, 'b': 0}, {'a': -3, 'b': 1.1}]],
  ['Subtraction (numbers)', ['.a - .b', '.b - .a', '4- 3', '-3-(4)'], [{'a': 3, 'b': 0}, {'a': -3, 'b': 1.1}]],
  ['Multiplication (numbers)', [
    '1 * 1', '.a * [.b][0]', '.b * .a', '3 * 4.1 * .a', '3 * (-.3)',
  ], [{'a': 3, 'b': 0}, {'a': -3, 'b': 1.1}]],
  ['Modulo (numbers)', [
    '1 % 1', '.a % [.b][0]', '.b % .a', '3 % 4 % .a', 
  ], [{'a': 3, 'b': 1}, {'a': -3, 'b': 1}]],
  ['Division (numbers)', [
    '.a / .b', '.b / .a', '4/ 3', '-3/(4)', '-1.1 + (3 * (((.4 - .b) / .a) + .b))'
  ], [{'a': 3, 'b': -1.1}, {'a': -3, 'b': 1.1}]],
  ['Array Construction', ['[]', '[4]', '[-6, [0]]', '[7 | 4]', '[.]', '[. | [6]]', '[5, 6] | .'], [[1], {'a': 'a'}]],
  ['Object Construction', [
    '{}', '{"foo": 6}', '{"foo": 6, "bar": [5, 3]}', '{"x": 3} | {"y": .x}',
    '{foo: "bar"}', '{({"a": "b"} | .a): true}'
  ], [[1], {'a': 'a'}]],
  ['Integer literal', ['3', '6', '-4', '0', '8'], [[1], {'a': 'a'}]],
  ['Float literal', ['.3', '6.0', '-4.001', '3.14', '0.1'], [[1], {'a': 'a'}]],
  ['Boolean literal', ['true', 'false'], [[1], {'a': 'a'}]],
  ['Double quote String literal', ['"true"', '"false"', '"foo"', '["ba\'r"]',], [[1], {'a': 'a'}]],
  ['length', ['[] | length', 'length', ], [[], [1], [3, [3]]]],
  ['keys', ['keys', ], [{}, {'a': 3}, {'b': {'a': 3}, 'a': null}]],
  ['keys_unsorted', ['keys_unsorted', ], [{}, {'a': 3}, {'b': {'a': 3}, 'a': null}]],
]

const tests_jq_web = [
  ['Array Construction', ['[]', '[4]'], [[1], {'a': 'a'}]],
  ['Array/Object Value Iterator', ['.[]'], [
    [1, -1], ["foo"], {'foo': 1, 'bar': -5.3}, {'foo': []}
  ]],

  ['Array/Object Value Iterator 2', ['.["foo"][]', '.foo[]'], [
    {'foo': [3, 3]}
  ]],

  ['Pipe', ['.[] | .b'], [
    {'a': {'b': 4}}, {'a': {'b': 'oo'}},
  ]]
]

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
