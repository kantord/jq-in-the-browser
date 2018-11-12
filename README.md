# DISCONTINUED in favor of [emuto](https://github.com/kantord/emuto)

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
Identity|```.```, ``` .  ```
Array Index|```.[0]```, ```.[1 ]```, ```.[-1]```, ```.[ 1][0]```, ```.[1][1].x```, ```.[1][1].x[0]```, ```.[ -1 ]```
Object Identifier-Index|```.foo```, ```.bar```, ```.bar.x```, ```.foo[1]```
Generic Object Index|```.["foo"]```, ```.["bar"].x```, ```.bar[ "y"]```, ```.["2bar"]```, ```.["a b" ]```
Pipe|```.a \| .b```, ```.a\|.b```
Parentheses|```( .a)```, ```((.a))```, ```(-1 )```, ```(-5.5)```, ```(.4)```, ```(. \| .)```
Addition (numbers)|```1 + 1```, ```.a + [.b][0]```, ```.b + .a```, ```3 + 4.1 + .a```, ```3 + (-3)```
Subtraction (numbers)|```.a - .b```, ```.b - .a```, ```4- 3```, ```-3    -(4)```
Multiplication (numbers)|```1 * 1```, ```.a * [.b][0]```, ```.b * .a```, ```3 * 4.1 * .a```, ```3 * (-.3)```
Modulo (numbers)|```1 % 1```, ```.a % [.b][0]```, ```.b % .a```, ```3 % 4 % .a```
Division (numbers)|```.a / .b```, ```.b / .a```, ```4/ 3```, ```-3/(4)```, ```-1.1 + (3 * (((.4 - .b) / .a) + .b))```
Array Construction|```[]```, ```[ ]```, ```[4]```, ```[ -6, [0]]```, ```[7 \| 4]```, ```[.]```, ```[. \| [6]]```, ```[5, 6] \| .```
Object Construction|```{}```, ```{  }```, ```{"foo": 6}```, ```{"foo": 6, "bar": [5, 3]}```, ```{"x": 3} \| {"y": .x}```, ```{foo: "bar"}```, ```{({"a": "b"} \| .a): true}```, ```{"a": 4, "b": 3, "c": -1, "d": "f"}```
Integer literal|```3```, ```  6```, ```-4```, ```0```, ```8```
Float literal|```.3```, ```6.0```, ```-4.001```, ```3.14```, ```0.1```
Boolean literal|```true```, ```false```
Double quote String literal|```"true"```, ```"false"```, ```"foo"```, ```["ba'r"]```
length|```[] \| length```, ```length```
keys|```keys```
keys_unsorted|```keys_unsorted```
to_entries|```. \| to_entries```
from_entries|```. \| from_entries```
reverse|```. \| reverse```
map|```map(.+1 )```, ```. \| map( {foo: .})```
map_values|```map_values(.+1 )```, ```. \| map_values( {foo: .})```
with_entries|```with_entries({key: .key, value: (2 * .value)})```, ```with_entries({key: "a", value: (2 * .value)})```
tonumber|```tonumber```
tostring|```tostring```
sort|```sort```, ```[4, 5, 6] \| sort```
sort_by|```sort_by(-.)```, ```sort_by(1 + .)```, ```sort_by(1)```
join|```join(", ")```, ```join("")```, ```join(.[0])```
Additive inverse|```-(1 + 3)```, ```-(-1)```, ```.a \| -(.b)```, ```[--1]```
Array Construction|```[]```, ```[4]```
Array/Object Value Iterator|```.[]```, ```.[ ]```
Array/Object Value Iterator 2|```.["foo"][]```, ```.foo[]```
Pipe|```.[] \| .```, ```.[] \| .name```
Stream as object value|```{names: .[] \| .name}```, ```{"names": .[] \| .name, "ages": .[] \| .age}```, ```{"names": .[] \| .name, "x": 3}```, ```{"names": 5.4, "x": .[] \| .age}```, ```{names: 5.4, ages: .[] \| .age, ages2: .[] \| .id}```
Array/String slice|```.[2:4]```, ```.[0:1]```
