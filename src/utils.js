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

/**
 * Calculates the horizontal scroll amount of the page.
 *
 * This is more complex than it should be, because of browser inconsistencies.
 *
 * @return {Number} The scroll amount in percent.
 */
export function scrollPercentX () {
  const a = document.documentElement
  const b = document.body
  return (a.scrollLeft || b.scrollLeft) / ((a.scrollWidth || b.scrollWidth) - a.clientWidth)
}

/**
 * Calculates the vertical scroll amount of the page.
 *
 * This is more complex than it should be, because of browser inconsistencies.
 *
 * @return {Number} The scroll amount in percent.
 */
export function scrollPercentY () {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement || document.body

  if (!scrollTop) { return 0 }

  const scrollPercent = scrollTop / (scrollHeight - clientHeight)
  const scrollPercentClamped = Math.min(Math.max(0, scrollPercent), 1)

  return scrollPercentClamped
}

/**
 * Returns a seed generator function, based on the current date.
 *
 * When the returned seed generator function is called, it returns a new integer
 * value. This value can be used to seed a pseudorandom number generator.
 *
 * @returns {Function} A seed generator function.
 */
export function seedGenerator () {
  let h = Date.now()
  return () => {
    h = Math.imul(h ^ h >>> 16, 2246822507)
    h = Math.imul(h ^ h >>> 13, 3266489909)
    return (h ^= h >>> 16) >>> 0
  }
}

/**
 * Returns a pseudorandom number generator function, using the given seed value.
 *
 * The seed allows the generator to deterministically return the same sequence
 * of pseudorandom numbers.
 *
 * This generator uses the mulberry32 algorithm, for more details see:
 *
 * https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 *
 * @param {Number} seed The seed value.
 * @returns {Function} A random number generator function.
 */
export function prng (seed) {
  return () => {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

/**
 * Chooses a random from an array, using a given pseudorandom number generator.
 *
 * @param {Function} rand The PRNG function.
 * @param {Array} as An array.
 * @return {Object} A random element from the array.
 */
export function choose (rand, as) {
  const i = Math.floor(rand() * as.length)
  return as[i]
}
