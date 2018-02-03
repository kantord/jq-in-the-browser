import { tests_jq_web, tests_node_jq } from './test_spec.js'
import { test_with_jq_web } from './test_helpers.js'

tests_jq_web.forEach(test_with_jq_web)
tests_node_jq.forEach(test_with_jq_web)


