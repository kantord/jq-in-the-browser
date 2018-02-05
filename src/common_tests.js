import assert from 'assert'
import parser from './jq.js'
import should from 'should'

describe('Single quote String literal', () => {
  it('per se', () => {
    assert.equal(parser("'Hello \"World\"!'")(null), 'Hello "World"!')
  })

  it('as key', () => {
    assert.deepEqual(parser("{'a': false}")(null), {'a': false})
  })
})

describe('Other tests', () => {
  it('handle example code correctly', () => {
    const query = '{"names": .[] | .name}'
    const input = [
      {"name": "Mary", "age": 22},
      {"name": "Rupert", "age": 29},
      {"name": "Jane", "age": 11},
      {"name": "John", "age": 42}
    ]
    const output = [
      {
        "names": "Mary"
      },
      {
        "names": "Rupert"
      },
      {
        "names": "Jane"
      },
      {
        "names": "John"
      },
    ]
    assert.deepEqual(parser(query)(input), output)
  })

  it('handle example code correctly 2', () => {
    const query = '{"names": [.[] | .name]}'
    const input = [
      {"name": "Mary", "age": 22},
      {"name": "Rupert", "age": 29},
      {"name": "Jane", "age": 11},
      {"name": "John", "age": 42}
    ]
    const output = {
      "names": [
        "Mary",
        "Rupert",
        "Jane",
        "John"
      ]
    }

    assert.deepEqual(parser(query)(input), output)
  })
})


describe('Error messages', () => {
  const tests = [
    ['. | foo', 'function foo/0 is not defined'],
    ['. | bar', 'function bar/0 is not defined'],
    ['. | bar(4)', 'function bar/1 is not defined'],
    ['. | baz(4)', 'function baz/1 is not defined']
  ]

  tests.forEach(([query, error]) =>
    it(`Error '${error}' for '${query}'`, () => {
      (() => parser(query)(input)).should.throw(error)
    })
  )
})
