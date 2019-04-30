import Bus from 'bulb/dist/Bus'

import stateMachine from './stateMachine'
import { get } from './userState'

/**
 * The placement engine is responsible for placing the given promos into slots.
 *
 * @param {Array} promos The list of promos.
 * @param {Window} window The window object.
 * @returns {Signal} A signal that emits the placed promos.
 */
export default function placementEngine (promos, window) {
  // Load the user state.
  const user = get(window.localStorage)

  // Create the bus signal.
  const bus = new Bus()

  // A function that emits a `click` event on the bus.
  const onClick = promo => bus.next({ type: 'click', promo })

  // A function that emits a `close` event on the bus.
  const onClose = promo => bus.next({ type: 'close', promo })

  // Create the initial state object.
  const initialState = { user }

  // The state signal emits the current placement engine state whenever an
  // event is emitted on the bus.
  const stateSignal = bus
    // Emit an initial `visit` event on the bus.
    .startWith({ type: 'visit' })

    // Run the state machine function over the events emitted on the bus.
    .stateMachine(stateMachine(promos, window), initialState)

    // Emit the placed promos and callback functions.
    .map(({ promos }) => ({ promos, onClick, onClose }))

  return stateSignal
}
