{
    const _ = require('lodash')
}

start
    = filter

head_filter
    = object_identifier_index
    / identity

filter
    = head_filter:head_filter transforms:transforms {return i => transforms(head_filter(i))}
    / head_filter

transforms
    = funcs:(transform +) {return input => _.flow(funcs)(input)}

transform
    = bracket_transforms
    / object_identifier_index

bracket_transforms
    = '["' key:string_core '"]' {return i => i[key]}
    / "[" index:index "]" {return i => i[index]}
    / "[-" index:index "]" {return i => i[i.length - index]}

identity
    = "." {return _.identity}

object_identifier_index
    = "." name:name {return x => x[name]}

string_core
    = [^"]* {return text()}

name
    = name:([a-zA-Z_$][0-9a-zA-Z_$]*) {return text()}

index
    = index:[0-9]+ {return index}
