# jq-in-the-browser

jq-in-the-browser is a JavaScript port of jq. [Try it online](https://runkit.com/kantord/runkit-npm-jq-in-the-browser)

Instead of processing serialized data, jq-in-the-browser processes JavaScript
objects. It is written from scratch and is relatively small. (~33 kB, ~6.1 kB gzipped)

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

## Comparison with alternatives

### jq-web
  
  - jq-web is an emcripten port of jq, thus it implements all of its features
  - ... but it's also too big for many purposes (in the megabytes)
  - jq-in-the-browser is written from scratch, but is more limited in features
  - ... and also much much smaller :-)

### node-jq
  - node-jq is great, but it doesn't work in the browser.

### something else?
If you know an alternative, feel free to create a pull request. :-)

## Supported features

Feature | Example 
--- | ---
