const always = require('fkit/dist/always')
const compare = require('fkit/dist/compare')
const compose = require('fkit/dist/compose')
const copy = require('fkit/dist/copy')
const filter = require('fkit/dist/filter')
const groupBy = require('fkit/dist/groupBy')
const head = require('fkit/dist/head')
const map = require('fkit/dist/map')
const sample = require('fkit/dist/sample')
const sortBy = require('fkit/dist/sortBy')

const match = require('./match')

/**
 * Filters promos based on which promo constraints are satisfied by the client
 * state.
 *
 * Placement rules:
 *
 *   - Promos with satisfied constraints will be placed, otherwise they are skipped.
 *   - If a group contains two or more promos, then one will be picked at random.
 *   - Promos without a group are picked independently of each other.
 *
 * @params {Array} promos The list of promos to place.
 * @params {Object} state The client state object.
 * @returns {Array} The list of placed promos.
 */
function placePromos (promos, state) {
  // Filter the promos that have matching constraints.
  const f = filter(promo => {
    // Promos without constraints are passed through.
    const predicate = promo.constraints ? match(promo.constraints) : always(true)

    // Include the promo object in the client state object.
    state = copy(state, { promo })

    return predicate(state)
  })

  // Sort the promos by group.
  const g = sortBy((a, b) => compare(a.groupId, b.groupId))

  // Group the promos by group. Promos without a group are considered to be in
  // a group of their own.
  const h = groupBy((a, b) => a.groupId && b.groupId && a.groupId === b.groupId)

  // Choose one random promo from each group.
  //
  // Only one promo from each group may be placed at the same time. This allows
  // us to randomly cycle through multiple variants of a promo.
  const i = map(group => head(sample(1, group)))

  // Compose the transform functions and apply the promos to get the list of
  // placed promos.
  return compose(i, h, g, f)(promos)
}

module.exports = placePromos