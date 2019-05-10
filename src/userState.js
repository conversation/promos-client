import curry from 'fkit/dist/curry'

/**
 * Loads the user state.
 *
 * @param storage The storage object.
 * @returns {Object} The user state.
 */
export function getUser (storage) {
  return JSON.parse(storage.getItem('user')) || {
    blocked: {},
    impressions: {},
    visits: 0
  }
}

/**
 * Stores the given user state.
 *
 * This function is curried for convenience, so that it can be either partially
 * or fully applied.
 *
 * @param {Storage} storage The storage object.
 * @param {Object} user The user state.
 * @returns {Object} The user state.
 */
export const setUser = curry((storage, user) => {
  storage.setItem('user', JSON.stringify(user))
  return user
})

/**
 * Updates the given user state with a function.
 *
 * This function is curried for convenience, so that it can be either partially
 * or fully applied.
 *
 * @param {Storage} storage The storage object.
 * @param {Function} transform The transform function.
 * @param {Object} user The user state.
 * @returns {Object} The user state.
 */
export const updateUser = curry((storage, transform, user) =>
  setUser(storage, transform(user))
)
