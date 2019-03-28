const always = require('fkit/dist/always')
const compare = require('fkit/dist/compare')
const compose = require('fkit/dist/compose')
const copy = require('fkit/dist/copy')
const filter = require('fkit/dist/filter')
const getIn = require('fkit/dist/getIn')
const groupBy = require('fkit/dist/groupBy')
const head = require('fkit/dist/head')
const map = require('fkit/dist/map')
const pick = require('fkit/dist/pick')
const sample = require('fkit/dist/sample')
const sortBy = require('fkit/dist/sortBy')
const UAParser = require('ua-parser-js')

const match = require('./match')

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
function placePromos (promos, user, window) {
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
