import always from 'fkit/dist/always'
import compare from 'fkit/dist/compare'
import compose from 'fkit/dist/compose'
import copy from 'fkit/dist/copy'
import filter from 'fkit/dist/filter'
import getIn from 'fkit/dist/getIn'
import chunkBy from 'fkit/dist/chunkBy'
import head from 'fkit/dist/head'
import map from 'fkit/dist/map'
import pick from 'fkit/dist/pick'
import sample from 'fkit/dist/sample'
import sortBy from 'fkit/dist/sortBy'
import UAParser from 'ua-parser-js'

import match from './match'

const PROMO_PROPERTIES = ['creativeId', 'promoId', 'slotId', 'groupId', 'campaignId']

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
 * @params {Object} user The user object.
 * @params {Window} window The window object.
 * @returns {Array} The list of placed promos.
 */
export default function placePromos (promos, user, window) {
  const parser = new UAParser(getIn('navigator.userAgent', window))

  // The client state object used to match promo constraints. This object
  // should contain everything we want to match against.
  const clientState = {
    browser: parser.getBrowser(),
    device: parser.getDevice(),
    os: parser.getOS(),
    user,
    window
  }

  // Filter the promos that have matching constraints.
  const f = filter(promo => {
    // Promos without constraints are passed through.
    const predicate = promo.constraints ? match(promo.constraints) : always(true)

    // Include several properties from the promo in the client state.
    const clientState_ = copy(clientState, pick(PROMO_PROPERTIES, promo))

    return predicate(clientState_)
  })

  // Sort the promos by group.
  const g = sortBy((a, b) => compare(a.groupId, b.groupId))

  // Chunk the promos by group. Promos without a group are considered to be in
  // a group of their own.
  const h = chunkBy((a, b) => a.groupId && b.groupId && a.groupId === b.groupId)

  // Choose one random promo from each group.
  //
  // Only one promo from each group may be placed at the same time. This allows
  // us to randomly cycle through multiple variants of a promo.
  const i = map(group => head(sample(1, group)))

  // Compose the transform functions and apply the promos to get the list of
  // placed promos.
  return compose(i, h, g, f)(promos)
}
