const always = require('fkit/dist/always')
const compose = require('fkit/dist/compose')
const filter = require('fkit/dist/filter')
const groupBy = require('fkit/dist/groupBy')
const head = require('fkit/dist/head')
const map = require('fkit/dist/map')
const sample = require('fkit/dist/sample')

const match = require('./match')

/**
 * The placement engine is responsible for placing promos into slots, based on
 * promo constraints and the client state object.
 *
 * All promos with constraints will be matched with the client state object.
 * Promos with matching constraints will be placed, otherwise they will be
 * ignored.
 *
 * @params {Object} state The client state object.
 * @params {Array} promos The list of promos to place.
 * @returns {Array} The list of placed promos.
 */
function placementEngine (state, promos) {
  // Filter the promos that have matching constraints.
  const f = filter(promo => {
    // Promos without constraints are passed through.
    const predicate = promo.constraints ? match(promo.constraints) : always(true)
    return predicate(state)
  })

  // Group the promos by groupId.
  const g = groupBy((a, b) => a.groupId === b.groupId)

  // Choose one random promo from each group.
  //
  // Only one promo from each group may be placed at the same time. This allows
  // us to randomly cycle through multiple variants of a promo.
  const h = map(group => head(sample(1, group)))

  // Compose the transform functions and apply the promos to get the list of
  // placed promos.
  const placedPromos = compose(h, g, f)(promos)

  return placedPromos
}

module.exports = placementEngine
