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
})
