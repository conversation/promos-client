import head from 'fkit/dist/head'
import last from 'fkit/dist/last'

/**
 * Escapes the regular expression string. For more info see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 *
 * @private
 */
function escapeRegExp (s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Returns the current timestamp.
 *
 * @returns {String} The ISO8601 date string.
 */
export function timestamp () {
  return new Date().toISOString()
}

/**
 * Returns the difference between now and the given date, in seconds.
 *
 * @param {String} date The ISO8601 date string.
 * @returns {Number} The difference in seconds.
 */
export function age (date) {
  const delta = Date.now() - Date.parse(date)
  return Math.floor(delta / 1000)
}

/**
 * Determines whether the given string matches a regular expression.
 *
 * @param {String} s The string.
 * @param {String} re The regular expression.
 * @return {Boolean} `true` if the given string `s` matches the regular
 * expression `re`, `false` otherwise.
 */
export function match (s, re) {
  return new RegExp(re).test(s)
}

/**
 * Determines whether the given string matches a pattern.
 *
 * @param {String} s The string.
 * @param {String} pattern The pattern.
 * @return {Boolean} `true` if the given string `s` matches the `pattern`,
 * `false` otherwise.
 */
export function like (s, pattern) {
  if (pattern === '%') return true
  let re = escapeRegExp(pattern.replace(/(^%|%$)/g, ''))
  if (head(pattern) === '%') re = '.+' + re
  if (last(pattern) === '%') re = re + '.+'
  return match(s, re)
}

/**
 * Determines whether the given value contains a target.
 *
 * @param {Array|Object|String} value The value.
 * @param {String} target The target.
 * @return {Boolean} `true` if the `value` contains the `target`, `false`
 * otherwise.
 */
export function has (value, target) {
  if (!value) {
    return false
  } else if (typeof value === 'string' || Array.isArray(value)) {
    return value.indexOf(target) >= 0
  } else {
    return Object.prototype.hasOwnProperty.call(value, target)
  }
}

/**
 * Determines whether the given values are present (i.e. not `null`) and equal.
 * The function `f` is applied to the values _before_ they are compared.
 *
 * @function
 * @param {Function} f The function to apply to the values before comparing
 * them.
 * @param a The first value.
 * @param b The second value.
 * @returns {Boolean} `true` if the value `f(a)` is strictly equal (`===`) to
 * the value `f(b)`, false otherwise.
 */
export const xeqBy = f => (a, b) => {
  const a_ = f(a)
  const b_ = f(b)
  return (
    a_ !== undefined && a_ !== null &&
    b_ !== undefined && b_ !== null &&
    a_ === b_
  )
}
