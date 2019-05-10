import curry from 'fkit/dist/curry'
import id from 'fkit/dist/id'
import last from 'fkit/dist/last'
import pipe from 'fkit/dist/pipe'
import update from 'fkit/dist/update'

/**
 * Increments the counter and sets the timestamp for the given key path.
 *
 * @private
 */
function incrementCounter (keyPath, ts) {
  // Return the identity function (NOOP) if the last element in the key path is
  // falsey. For example, when the groupId is null.
  if (!last(keyPath)) return id

  return update(keyPath, state => {
    const { count } = state || { count: 0 }
    return {
      count: count + 1,
      timestamp: ts
    }
  })
}

/**
 * Increments the counters and updates the timestamps for the given key.
 *
 * This function is curried for convenience, so that it can be either partially
 * or fully applied.
 *
 * @param {String} key The counter to increment.
 * @param {String} ts The timestamp.
 * @param {Object} promo The promo object.
 * @returns {Function} A transform function.
 */
const incrementCounters = (key, ts, promo) =>
  pipe(
    incrementCounter([key, 'campaigns', promo.campaignId], ts),
    incrementCounter([key, 'groups', promo.groupId], ts),
    incrementCounter([key, 'promos', promo.promoId], ts)
  )

export default curry(incrementCounters)
