import curry from 'fkit/dist/curry'

export const DEFAULT_USER_STATE = {
  blocked: {},
  impressions: {},
  visits: 0
}

/**
 * Loads the user state.
 *
 * @param {?Storage} storage The storage object.
 * @returns {Object} The user state.
 */
export function getUser (storage) {
  if (!storage) {
    return DEFAULT_USER_STATE
  }

  return JSON.parse(storage.getItem('user')) || DEFAULT_USER_STATE
}

/**
 * Stores the given user state.
 *
 * This function is curried for convenience, so that it can be either partially
 * or fully applied.
 *
 * @param {?Storage} storage The storage object.
 * @param {Object} user The user state.
 * @returns {Object} The user state.
 */
export const setUser = curry((storage, user) => {
  if (!storage) {
    return DEFAULT_USER_STATE
  }

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
