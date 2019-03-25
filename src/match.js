const parser = require('./parser')

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp (s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Helper functions required by the parser.
const helpers = {
  match: (val, pattern) => {
    if (pattern === '*') return true
    let pat = escapeRegExp(pattern.replace(/(^\*|\*$)/g, ''))
    if (pattern[0] === '*') pat = '.+' + pat
    if (pattern[pattern.length - 1] === '*') pat = pat + '.+'
    return new RegExp(pat).test(val)
  },
  regex: (val, re) => {
    return new RegExp(re).test(val)
  },
  idxof: (val, x) => {
    let type = (Object.prototype.toString.call(val).match(/^\[object (.*)]$/) || [])[1]
    return val && (type === 'String' || type === 'Array') && val.indexOf(x) >= 0
  }
}

/**
 * Returns a predicate function that matches the given query.
 *
 * @param {String} query The query to match.
 * @returns {Function} A predicate function which returns a boolean indicating
 * whether the given values match the query.
 *
 * @example
 *
 * const p = match('count > 42')
 * p({ count: 42 }) // false
 * p({ count: 43 }) // true
 */
function match (query) {
  const expression = parser.parse(query)
  const f = new Function('_helpers', '_env', 'return ' + expression) // eslint-disable-line
  return state => Boolean(f(helpers, state))
}

module.exports = match
