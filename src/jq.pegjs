{
    const _ = require('lodash')
}

start
    = pipeline

_
    = [ ]*

pipeline
    = left:filter _ "|" _ right:pipeline {return input => right(left(input))}
    / filter

head_filter
    = float_literal
    / boolean_literal
    / object_identifier_index
    / identity
    / array_construction
    / object_construction
    / integer_literal
    / string_literal
    / length
    / keys_unsorted
    / keys

string_literal
    = '"' core:string_core '"' {return input => core}

boolean_literal
    = true
    / false

true
    = "true" {return input => true}

false
    = "false" {return input => false}

length
    = "length" {return input => input.length}

keys
    = "keys" {return input => Object.keys(input).sort()}

keys_unsorted
    = "keys_unsorted" {return input => Object.keys(input)}

array_construction
    = "[]" {return input => []}
    / "[" array_inside:array_inside "]" {return input => array_inside(input)}

object_construction
    = "{}" {return input => ({})}
    / "{" object_inside:object_inside "}" {return input => object_inside(input)}

array_inside
    = left:pipeline _ "," _ right:array_inside {return input => [left(input)].concat(right(input))}
    / pipeline:pipeline {return input => [pipeline(input)]}

object_inside
    = left:pair _ "," _ right:object_inside {return input => Object.assign(left(input), right(input))}
    / pair:pair {return input => pair(input)}

pair
    = '"' key:string_core '"' _ ':' _ value:pipeline {
        return input => {
            let obj = {};
            obj[key] = value(input);
            return obj;
        }
    }

float_literal
    = "-"? ([0-9]*) "." ([0-9]+) {return input => text() * 1}

integer_literal
    = "-" number:([0-9]+) {return input => number.join() * -1}
    / number:([0-9]+) {return input => number.join() * 1}

filter
    = head_filter:head_filter transforms:transforms {return i => transforms(head_filter(i))}
    / head_filter

transforms
    = funcs:(transform +) {return input => _.flow(funcs)(input)}

transform
    = bracket_transforms
    / object_identifier_index

bracket_transforms
    = "[]" {
        return function(input) {
            const handle_array = function(array) {
                if (array.length <= 1) return array[0]
                return array
            }

            if (input instanceof Array) {
                return handle_array(input)
            } else {
                if (typeof input === 'object') return handle_array(Object.values(input))
            }

            return input
        }
    }
    / '["' key:string_core '"]' {return i => i[key]}
    / "[" index:index "]" {return i => i[index]}
    / "[-" index:index "]" {return i => i[i.length - index]}

identity
    = "." {return _.identity}

object_identifier_index
    = "." name:name {return x => x[name]}

string_core
    = string_char* {return text()}

string_char
    = [^"] {return text()}

name
    = name:([a-zA-Z_$][0-9a-zA-Z_$]*) {return text()}

index
    = index:[0-9]+ {return index}
