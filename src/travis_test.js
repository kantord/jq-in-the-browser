import { test_with_jq_web } from './test_helpers.js'
const { tests_jq_web, tests_node_jq } = require('json-loader!./tests.json')

tests_jq_web.forEach(test_with_jq_web)
tests_node_jq.forEach(test_with_jq_web)


