# jq-in-the-browser

jq-in-the-browser is a JavaScript port of jq, currently supporting a subset of it's features. [Try it online](https://runkit.com/kantord/runkit-npm-jq-in-the-browser)

jq-in-the-browser works directly on JavaScript objects. It is
relatively small (16.6 kB, 5 kB gzipped)

## Install
`npm install --save jq-in-the-browser`

## Usage
```javascript
import jq from 'jq-in-the-browser'

const query = jq('{"names": [.[] | .name]}')

query([
  {"name": "Mary", "age": 22},
  {"name": "Rupert", "age": 29},
  {"name": "Jane", "age": 11},
  {"name": "John", "age": 42}
])
```

Output:
```json
{
  "names": [
    "Mary",
    "Rupert",
    "Jane",
    "John"
  ]
}
```

## Supported features

Feature | Example 
--- | ---
