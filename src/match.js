const parser = require('./zerkel-parser')

/**
 * Returns a matching function for the given zerkel query.
 *
 * @param {String} query The query to match.
 * @returns {Function} A function which returns a boolean indicating whether
 * the given values match the zerkel query.
 *
 * @example
 *
 * const matcher = match('count > 42')
 * matcher({ count: 42 }) // false
 * matcher({ count: 43 }) // true
 */
const match = query => {
  const body = parser.parse(query)
  return new Function('_env', 'return ' + body) // eslint-disable-line
}

module.exports = match
