const _ = require('lodash')
const sample = require('lodash/sample')

const match = require('./match')

/**
 * The placement engine is responsible for placing promos into slots, based on
 * various constraints.
 *
 * The constraints for each promo will be matched with the client state. Promos
 * that have matching constraints will be placed, otherwise they will be
 * ignored.
 *
 * @params {Array} promos The list of promos to place.
 * @params {Object} state The client state to constrain the promos with.
 * @returns {Array} The placed promos.
 */
function placementEngine (promos, state = {}) {
  return _
    .chain(promos)
    .filter(promo => {
      return promo.constraints ? match(promo.constraints)(state) : true
    })
    .groupBy('groupId')
    .map(group => sample(group))
    .value()
}

module.exports = placementEngine
