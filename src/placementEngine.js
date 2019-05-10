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
 * The placement engine is responsible for placing the given promos. When the
 * engine is run, the placed promos are returned along with various callbacks
 * for the calling application to call when events occur (i.e. a promo is
 * clicked, etc).
 *
 * The placement engine returns a promise that resolves to an object containing
 * the placed promos and the callback functions.
 *
 * @param {Storage} storage The storage object.
 * @param {Array} promos The list of the candidate promos.
 * @returns {Promise} A promise.
 */
function placementEngine (storage, promos) {
  const user = getUser(storage)

  // The pipeline contains the steps in the placement engine algorithm.
  const pipeline = pipe(
    updateUser(storage, incrementVisits),
    createContext,
    placePromos(promos),
    resolvePromos(storage)
  )

  return pipeline(user)
}

export default placementEngine
