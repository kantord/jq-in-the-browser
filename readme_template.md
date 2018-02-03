# jq-in-the-browser

jq.js is a Javascript port of jq, currently supporting a subset of it's features.

## Install
`npm install --save jq-in-the-browser`

## Usage
```
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
```
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
