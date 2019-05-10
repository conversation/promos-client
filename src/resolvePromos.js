import curry from 'fkit/dist/curry'
import incrementCounters from './incrementCounters'
import { getUser, updateUser } from './userState'
import { timestamp } from './utils'

// Adds the given promo to the list of blocked promos for the user.
const blockPromo = incrementCounters('blocked')

// Tracks an impression for the given promo.
const trackImpression = incrementCounters('impressions')

// Tracks an engagement for the given promo.
const trackEngagement = incrementCounters('engagements')

/**
 * Creates a callback handler, which when called, will apply the given transform
 * function to the user state.
 *
 * @private
 *
 * @param {Storage} storage The storage object.
 * @param {Function} transform The transform function to apply to the user
 * state, when the callback is called.
 * @param {Object} promo The promo that triggered the callback.
 * @returns {Function} The callback handler.
 */
const createHandler = (storage, transform) => promo => {
  const ts = timestamp()
  const user = getUser(storage)
  return updateUser(storage, transform(ts, promo), user)
}

/**
 * Returns a promise that resolves the given promos. The promise also resolves a
 * number of callback functions, which can be called when an event occurs on a
 * promo (e.g. when a promo is clicked).
 *
 * @param {Storage} storage The storage object.
 * @param {Array} promos The list of the promos.
 * @returns {Promise} A promise that resolves to the promos.
 */
function resolvePromos (storage, promos) {
  return Promise.resolve({
    promos,
    onClick: createHandler(storage, trackEngagement),
    onClose: createHandler(storage, blockPromo),
    onView: createHandler(storage, trackImpression)
  })
}

export default curry(resolvePromos)
