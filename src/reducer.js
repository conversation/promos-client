import compose from 'fkit/dist/compose'
import id from 'fkit/dist/id'
import inc from 'fkit/dist/inc'
import last from 'fkit/dist/last'
import update from 'fkit/dist/update'

import placePromos from './placePromos'
import { timestamp } from './utils'

/**
 * Increments the number of visits for the given user.
 *
 * @private
 */
function incrementVisits (user) {
  return update('visits', inc, user)
}

/**
 * Adds the given promo to the list of blocked promos for the user.
 *
 * @private
 */
function blockPromo (promo, ts, user) {
  return compose(
    updateEntity(['blocked', 'campaigns', promo.campaignId], ts),
    updateEntity(['blocked', 'groups', promo.groupId], ts),
    updateEntity(['blocked', 'promos', promo.promoId], ts)
  )(user)
}

/**
 * Tracks the impressions for the given list of promos.
 *
 * @private
 */
function trackImpressions (promos, ts, user) {
  return promos.reduce((user, promo) => compose(
    updateEntity(['impressions', 'campaigns', promo.campaignId], ts),
    updateEntity(['impressions', 'groups', promo.groupId], ts),
    updateEntity(['impressions', 'promos', promo.promoId], ts)
  )(user), user)
}

/**
 * Tracks the engagements for the given promo.
 *
 * @private
 */
function trackEngagements (promo, ts, user) {
  return compose(
    updateEntity(['engagements', 'campaigns', promo.campaignId], ts),
    updateEntity(['engagements', 'groups', promo.groupId], ts),
    updateEntity(['engagements', 'promos', promo.promoId], ts)
  )(user)
}

/**
 * Increments the counter and sets the timestamp for the given entity.
 *
 * @private
 */
function updateEntity (keyPath, ts) {
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
 * Applies an event to the current state to yield a new state.
 *
 * @param {Array} promos The list of promos.
 * @param {Window} window The window object.
 * @param {Object} state The current state.
 * @param {Object} event The event.
 * @returns A new state.
 */
function reducer (promos, window, state, event) {
  const ts = timestamp()
  let { user } = state

  if (event.type === 'visit') {
    // Increment the number of user visits.
    user = incrementVisits(user)
  } else if (event.type === 'click') {
    // Add promo to the list of engagements.
    user = trackEngagements(event.promo, ts, user)
  } else if (event.type === 'close') {
    // Add promo to the list of blocked promos.
    user = blockPromo(event.promo, ts, user)
  }

  // Place the promos.
  const placedPromos = placePromos(promos, user, window)

  // Track the impressions for the recently placed promos.
  user = trackImpressions(placedPromos, ts, user)

  return { promos: placedPromos, user }
}

export default reducer
