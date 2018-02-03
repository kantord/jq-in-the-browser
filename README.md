# jq-in-the-browser

jq.js is a Javascript port of jq, currently supporting a subset of it's features.

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
Object Construction|```{}```, ```{  }```, ```{"foo": 6}```, ```{"foo": 6, "bar": [5, 3]}```, ```{"x": 3} \| {"y": .x}```, ```{foo: "bar"}```, ```{({"a": "b"} \| .a): true}```
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
Pipe|```.[] \| .b```
