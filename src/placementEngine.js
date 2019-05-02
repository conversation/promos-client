import id from 'fkit/dist/id'
import inc from 'fkit/dist/inc'
import last from 'fkit/dist/last'
import pipe from 'fkit/dist/pipe'
import update from 'fkit/dist/update'

import placePromos from './placePromos'
import { get, set } from './userState'
import { timestamp } from './utils'

/**
 * Updates the counters for the given target.
 *
 * @private
 */
const updateCounters = (target) => (promo, ts) => pipe(
  incrementCounter([target, 'campaigns', promo.campaignId], ts),
  incrementCounter([target, 'groups', promo.groupId], ts),
  incrementCounter([target, 'promos', promo.promoId], ts)
)

/**
 * Increments the number of visits for the given user.
 *
 * @private
 */
const incrementVisits = update('visits', inc)

/**
 * Adds the given promo to the list of blocked promos for the user.
 *
 * @private
 */
const blockPromo = updateCounters('blocked')

/**
 * Tracks an impression for the given promo.
 *
 * @private
 */
const trackImpression = updateCounters('impressions')

/**
 * Tracks an engagement for the given promo.
 *
 * @private
 */
const trackEngagement = updateCounters('engagements')

/**
 * Increments the counter and sets the timestamp for the given entity.
 *
 * @private
 */
function incrementCounter (keyPath, ts) {
  // Return the identity function (NOOP) if the last element in the key path
  // is falsey.
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
 * The placement engine is responsible for placing the given promos. When the
 * engine is run, the placed promos are returned along with various callbacks
 * for the calling application to call when events occur (i.e. a promo is
 * clicked, etc).
 *
 * The placement engine returns a promise that resolves to an object containing
 * the placed promos and the callback functions.
 *
 * @param {Array} promos The list of the candidate promos.
 * @param {Window} window The window object.
 * @returns {Promise} A promise.
 */
export default function placementEngine (promos, window) {
  const user = get(window.localStorage)
  const updateUser = (f, user) => set(window.localStorage, f(user))

  const onClick = promo => {
    const user = get(window.localStorage)
    const f = trackEngagement(promo, timestamp())
    updateUser(f, user)
  }

  const onClose = promo => {
    const user = get(window.localStorage)
    const f = blockPromo(promo, timestamp())
    updateUser(f, user)
  }

  const onView = promo => {
    const user = get(window.localStorage)
    const f = trackImpression(promo, timestamp())
    updateUser(f, user)
  }

  const context = { user: updateUser(incrementVisits, user), window }

  // Return a promise containing the placed promos, and the callback functions.
  return Promise.resolve({
    promos: placePromos(context)(promos),
    onClick,
    onClose,
    onView
  })
}
