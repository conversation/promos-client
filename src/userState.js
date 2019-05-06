/**
 * Loads the user state.
 *
 * @param storage The storage object.
 * @returns {Object} The user state.
 */
export function get (storage) {
  return JSON.parse(storage.getItem('user')) || {
    blocked: {},
    impressions: {},
    visits: 0
  }
}

/**
 * Stores the given user state.
 *
 * @param {Storage} storage The storage object.
 * @param {Object} user The user state.
 */
export function set (storage, user) {
  storage.setItem('user', JSON.stringify(user))
  return user
}
