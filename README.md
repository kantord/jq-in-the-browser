# jq-in-the-browser

jq-in-the-browser is a Javascript port of jq, currently supporting a subset of it's features.

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
Array Construction|```[]```, ```[4]```
Array/Object Value Iterator|```.[]```, ```.[ ]```
Array/Object Value Iterator 2|```.["foo"][]```, ```.foo[]```
Pipe|```.[] \| .```, ```.[] \| .name```
Stream as object value|```{names: .[] \| .name}```, ```{"names": .[] \| .name, "ages": .[] \| .age}```, ```{"names": .[] \| .name, "x": 3}```, ```{"names": 5.4, "x": .[] \| .age}```, ```{names: 5.4, ages: .[] \| .age, ages2: .[] \| .id}```
