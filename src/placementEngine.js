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
 * Any promos with matching constraints will be placed, otherwise they will be
 * ignored.
 *
 * @params {Object} state The client state object.
 * @params {Array} promos The list of promos to place.
 * @returns {Array} The list of placed promos.
 */
function placementEngine (state, promos) {
  // Filters promos that have matching constraints.
  const f = filter(promo => promo.constraints ? match(promo.constraints)(state) : true)

  // Groups the promos by groupId.
  const g = groupBy((a, b) => a.groupId === b.groupId)

  // Chooses one random promo from each group.
  const h = map(group => head(sample(1, group)))

  return compose(h, g, f)(promos)
}

module.exports = placementEngine
