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
