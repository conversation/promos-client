const Bus = require('bulb/dist/Bus')

const groupBy = require('./groupBy')
const transformer = require('./transformer')
const userState = require('./userState')

/**
 * The placement engine is responsible for placing the given promos into slots.
 *
 * @param {Array} promos The list of promos.
 * @param {Window} window The window object.
 * @param {Function} callback The callback function called when the placements
 * are updated.
 */
function placementEngine (promos, window, callback) {
  // Load the user state.
  const user = userState.get(window.localStorage)

  // Create the bus signal.
  const bus = new Bus()

  // Create the initial state object. Every time an event is emitted on the
  // bus, a new state will be generated.
  const initialState = { promos, user, window }

  // The state signal emits the current placement engine state whenever an
  // event is emitted on the bus.
  const stateSignal = bus
    // Emit an initial `visit` event on the bus.
    .startWith({ type: 'visit' })

    // Scan the transform function over the events emitted on the bus.
    .scan(transformer, initialState)

    // Store the user state as a side effect.
    .tap(({ user, window }) => userState.set(window.localStorage, user))

  // Subscribe to values emitted by the state signal.
  return stateSignal.subscribe(({ promos, user, window }) => {
    const placementsMap = groupBy('slotId', promos)
    const onClose = promo => bus.next({ type: 'close', promo })
    callback(placementsMap, onClose)
  })
}

module.exports = placementEngine
