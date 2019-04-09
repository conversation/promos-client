import Bus from 'bulb/dist/Bus'
import groupBy from 'fkit/dist/groupBy'

import transformer from './transformer'
import userState from './userState'

/**
 * The placement engine is responsible for placing the given promos into slots.
 *
 * @param {Array} promos The list of promos.
 * @param {Window} window The window object.
 * @returns {Signal} A signal the emits placement maps.
 */
function placementEngine (promos, window) {
  // Load the user state.
  const user = userState.get(window.localStorage)

  // Create the bus signal.
  const bus = new Bus()

  // A function that emits a `close` event on the bus.
  const onClose = promo => bus.next({ type: 'close', promo })

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

    // Group promos by slot.
    .map(({ promos, user }) => {
      const placementsMap = groupBy('slotId', promos)
      return { placementsMap, onClose }
    })

  return stateSignal
}

module.exports = placementEngine
