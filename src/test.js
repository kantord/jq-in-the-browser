import { tests_jq_web, tests_node_jq } from './test_spec.js'
import { test_with_jq_web, test_with_node_jq } from './test_helpers.js'

tests_jq_web.forEach(test_with_jq_web)
tests_node_jq.forEach(test_with_node_jq)


