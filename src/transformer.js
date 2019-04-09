import get from 'fkit/dist/get'
import inc from 'fkit/dist/inc'
import union from 'fkit/dist/union'
import update from 'fkit/dist/update'

import placePromos from './placePromos'

// Increments the number of visits for the given user.
function incrementVisits (user) {
  return update('visits', inc, user)
}

// Adds the given promo to the list of blocked promos for the user.
function blockPromo (promo, user) {
  return update('blocked', union([promo.promoId]), user)
}

// Updates the impressions for the given user.
function updateImpressions (promos, user) {
  const ids = promos.map(get('promoId'))
  return update('impressions', union(ids), user)
}

/**
 * Applies the given event to yield a new state.
 *
 * @param {Object} state The state object.
 * @param {Object} event The event.
 * @returns A new state.
 */
function transformer (state, event) {
  let { promos, user, window } = state

  if (event.type === 'visit') {
    // Increment the number of user visits.
    user = incrementVisits(user)
  } else if (event.type === 'close') {
    // Add promo to the list of blocked promos.
    user = blockPromo(event.promo, user)
  }

  // Recalculate the placed promos.
  promos = placePromos(promos, user, window)

  // Add promos to the list of impressions.
  user = updateImpressions(promos, user)

  return { promos, user, window }
}

module.exports = transformer
