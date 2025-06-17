import parser from './parser'
import { has, like, match } from './utils'

/**
 * Runs a query in a given context.
 *
 * @param {String} query The query to run.
 * @param {Object} context The context used to run the query.
 * @returns The result of the query.
 *
 * @example
 *
 * runQuery('count > 42', { count: 42 }) // false
 * runQuery('count > 42', { count: 43 }) // true
 */
export default function runQuery (query, context) {
  // Parse the query into a JavaScript expression.
  let expression = ''
  try {
    expression = parser.parse(query)
  } catch (error) {
    console.error('The query' + query + ' is invalid and failed to get parsed')
    return false
  }

  // Create a function that runs the parsed expression, with the internal and
  // environment objects.
  const f = new Function('_helpers', '_context', 'return ' + expression) // eslint-disable-line

  // The internal helpers required by the parser.
  const helpers = { has, like, match }

  return f(helpers, context)
}
