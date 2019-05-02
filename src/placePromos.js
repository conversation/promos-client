import UAParser from 'ua-parser-js'
import chunkBy from 'fkit/dist/chunkBy'
import compareBy from 'fkit/dist/compareBy'
import copy from 'fkit/dist/copy'
import filter from 'fkit/dist/filter'
import get from 'fkit/dist/get'
import head from 'fkit/dist/head'
import map from 'fkit/dist/map'
import pick from 'fkit/dist/pick'
import pipe from 'fkit/dist/pipe'
import sample from 'fkit/dist/sample'
import sortBy from 'fkit/dist/sortBy'
import toLower from 'fkit/dist/toLower'
import toUpper from 'fkit/dist/toUpper'

import runQuery from './runQuery'
import { age } from './utils'

const PROMO_PROPERTIES = ['creativeId', 'promoId', 'slotId', 'groupId', 'campaignId']

/**
 * Extends the given context with functions and objects to be made available to
 * the query.
 *
 * @private
 */
function extendContext (context) {
  const uaParser = new UAParser(get('navigator.userAgent', context.window))

  return {
    ...context,

    // Functions
    age,
    lower: toLower,
    upper: toUpper,

    // Objects
    browser: uaParser.getBrowser(),
    device: uaParser.getDevice(),
    os: uaParser.getOS()
  }
}

/**
 * Filters the promos which satisfy their constraints in the given context.
 *
 * @private
 */
function filterPromos (context) {
  return filter(promo => {
    // The local context adds several properties from the current promo.
    const localContext = copy(context, pick(PROMO_PROPERTIES, promo))

    // Promos without constraints are passed through.
    return promo.constraints
      ? runQuery(promo.constraints, localContext)
      : true
  })
}

/**
 * Places the promos based on the following rules:
 *
 *   - Promos with satisfied constraints will be placed, otherwise they are skipped.
 *   - If a group contains two or more promos, then one will be picked at random.
 *   - Promos without a group are picked independently of each other.
 *
 * @params {Object} context The context object.
 * @params {Array} promos The list of promos to place.
 * @returns {Array} The list of placed promos.
 */
export default function placePromos (context, promos) {
  return pipe([
    // Filter the promos.
    filterPromos(extendContext(context)),

    // Sort the promos by groupId.
    sortBy(compareBy(get('groupId'))),

    // Chunk the promos in matching groups.
    chunkBy((a, b) => a.groupId && b.groupId && a.groupId === b.groupId),

    // Choose one random promo from each group.
    //
    // Only one promo from each group may be placed at the same time. This allows
    // us to randomly cycle through multiple variants of a promo.
    map(group => head(sample(1, group)))
  ])(promos)
}
