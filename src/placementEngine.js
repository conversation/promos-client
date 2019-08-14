import inc from 'fkit/dist/inc'
import pipe from 'fkit/dist/pipe'
import update from 'fkit/dist/update'

import createContext from './createContext'
import placePromos from './placePromos'
import resolvePromos from './resolvePromos'
import { getUser, updateUser } from './userState'

// Increments the number of visits for the user.
const incrementVisits = update('visits', inc)

/**
 * The placement engine is responsible for filtering promos based on certain
 * rules (e.g. constraints). It returns a promise that resolves to an object
 * with the following shape:
 *
 * - `promos`: The list of placed promos.
 * - `onClick`: The callback function that should be called if the user clicks a
 *   promo.
 * - `onClose`: The callback function that should be called if the user
 *   dismisses a promo.
 * - `onView`: The callback function that should be called if the user views a
 *   promo.
 *
 * @param {Storage} storage The storage object.
 * @param {Array} promos The list of the candidate promos.
 * @param {Object} custom The custom state object.
 * @returns {Promise} A promise that resolves to the promos.
 */
function placementEngine (storage, promos, custom) {
  // Generate a seed value for the PRNG.
  const seed = Date.now()

  const user = getUser(storage)

  // The pipeline contains the steps in the placement engine algorithm.
  const pipeline = pipe(
    updateUser(storage, incrementVisits),
    createContext(custom),
    placePromos(seed, promos),
    resolvePromos(storage)
  )

  return pipeline(user)
}

export default placementEngine
