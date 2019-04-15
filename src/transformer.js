import compose from 'fkit/dist/compose'
import id from 'fkit/dist/id'
import inc from 'fkit/dist/inc'
import last from 'fkit/dist/last'
import update from 'fkit/dist/update'

import placePromos from './placePromos'
import { timestamp } from './utils'

// Increments the number of visits for the given user.
function incrementVisits (user) {
  return update('visits', inc, user)
}

// Adds the given promo to the list of blocked promos for the user.
function blockPromo (promo, ts, user) {
  return compose(
    updateEntity(['blocked', 'campaigns', promo.campaignId], ts),
    updateEntity(['blocked', 'groups', promo.groupId], ts),
    updateEntity(['blocked', 'promos', promo.promoId], ts)
  )(user)
}

// Tracks the impressions for the given list of promos.
function trackImpressions (promos, ts, user) {
  return promos.reduce((user, promo) => compose(
    updateEntity(['impressions', 'campaigns', promo.campaignId], ts),
    updateEntity(['impressions', 'groups', promo.groupId], ts),
    updateEntity(['impressions', 'promos', promo.promoId], ts)
  )(user), user)
}

// Increments the counter and sets the timestamp for the given entity.
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
 * Applies the given event to yield a new state.
 *
 * @param {Object} state The state object.
 * @param {Object} event The event.
 * @returns A new state.
 */
export default function transformer (state, event) {
  let { promos, user, window } = state
  const ts = timestamp()

  if (event.type === 'visit') {
    // Increment the number of user visits.
    user = incrementVisits(user)
  } else if (event.type === 'close') {
    // Add promo to the list of blocked promos.
    user = blockPromo(event.promo, ts, user)
  }

  // Recalculate the placed promos.
  promos = placePromos(promos, user, window)

  // Add promos to the list of impressions.
  user = trackImpressions(promos, ts, user)

  return { promos, user, window }
}
