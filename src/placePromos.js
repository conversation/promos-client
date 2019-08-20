import chunkBy from 'fkit/dist/chunkBy'
import compareBy from 'fkit/dist/compareBy'
import copy from 'fkit/dist/copy'
import curry from 'fkit/dist/curry'
import filter from 'fkit/dist/filter'
import get from 'fkit/dist/get'
import map from 'fkit/dist/map'
import pick from 'fkit/dist/pick'
import pipe from 'fkit/dist/pipe'
import sortBy from 'fkit/dist/sortBy'

import runQuery from './runQuery'
import { choose, prng, xeqBy } from './utils'

// The properties to copy from a promo into a context.
const PROMO_PROPERTIES = ['creativeId', 'promoId', 'slotId', 'groupId', 'campaignId']

/**
 * Returns `true` if the promo's constraints are satisfied in the given context,
 * `false` otherwise.
 *
 * @private
 */
const isSatisfied = context => promo => {
  // Promos without constraints are passed through.
  if (!promo.constraints) return true

  // The local context copies several properties from the current promo.
  const localContext = copy(context, pick(PROMO_PROPERTIES, promo))

  return runQuery(promo.constraints, localContext)
}

/**
 * Filters the promos that have constraints satisfied in the given context.
 *
 * @private
 */
const filterPromos = context => filter(isSatisfied(context))

/**
 * Sorts the promos by groupId.
 *
 * @private
 */
const sortPromosByGroupId = sortBy(compareBy(get('groupId')))

/**
  * Chunks the promos by groupId.
  *
  * Promos with matching groupIds will be placed in the same chunk. Promos
  * without a groupId will be placed in their own chunks.
  *
  * @private
  */
const chunkPromosByGroupId = chunkBy(xeqBy(get('groupId')))

/**
 * Chooses one promo at random from each group.
 *
 * Only one promo from each group may be placed at the same time. This allows us
 * to randomly cycle through multiple variants of a promo.
 *
 * @private
 */
const chooseOnePromoFromEachGroup = seeds => map(group => choose(prng(seeds[group[0].groupId]), group))

/**
 * Places the promos based on the following rules:
 *
 *   - Promos with satisfied constraints will be placed, otherwise they are skipped.
 *   - If a group contains two or more promos, then one will be picked at random.
 *   - Promos without a group are picked independently of each other.
 *
 * This function is curried for convenience, so that it can be either partially
 * or fully applied.
 *
 * @param {Function} seeds A hash of seed values.
 * @param {Array} promos The list of promos to place.
 * @param {Object} context The placement context.
 * @returns {Array} The list of placed promos.
 */
function placePromos (seeds, promos, context) {
  // The pipeline contains the steps in the placement algorithm.
  const pipeline = pipe([
    filterPromos(context),
    sortPromosByGroupId,
    chunkPromosByGroupId,
    chooseOnePromoFromEachGroup(seeds)
  ])

  return pipeline(promos)
}

export default curry(placePromos)
