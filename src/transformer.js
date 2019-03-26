const get = require('fkit/dist/get')
const inc = require('fkit/dist/inc')
const union = require('fkit/dist/union')
const update = require('fkit/dist/update')

const placePromos = require('./placePromos')

// Increments the number of visits for the given user.
function incrementVisits (user) {
  return update('visits', inc, user)
}

// Adds the given promo to the list of blocked promos for the user.
function blockPromo (promo, user) {
  return update('blocked', union([promo.id]), user)
}

// Updates the impressions for the given user.
function updateImpressions (promos, user) {
  const ids = promos.map(get('id'))
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
  promos = placePromos(promos, { user, window })

  // Add promos to the list of impressions.
  user = updateImpressions(promos, user)

  return { promos, user, window }
}

module.exports = transformer
