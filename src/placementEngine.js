import Bus from 'bulb/dist/Bus'

import stateMachine from './stateMachine'
import { getUser } from './userState'

/**
 * The placement engine is responsible for filtering promos based on certain
 * rules (e.g. constraints). It returns a promise that resolves to an object
 * with the following shape:
 *
 * - `promos`: The list of placed promos.
 * - `onClick`: The callback function that should be called if the user clicks a
 *   promo.
 * - `onClose`: The callback function that should be called if the user
 *   dismisses a promo.
 * - `onView`: The callback function that should be called if the user views a
 *   promo.
 *
 * @param {Storage} storage The storage object.
 * @param {Array} promos The list of the candidate promos.
 * @param {Object} custom The custom state object.
 * @returns {Promise} A promise that resolves to the promos.
 */
function placementEngine (storage, promos, custom = {}) {
  // Generate a seed value for the PRNG.
  const seed = Date.now()

  // Load the user state.
  const user = getUser(storage)

  // Create the bus signal.
  const bus = new Bus()

  // A function that emits a `click` event on the bus.
  const onClick = promo => bus.next({ type: 'click', promo })

  // A function that emits a `close` event on the bus.
  const onClose = promo => bus.next({ type: 'close', promo })

  // A function that emits a `view` event on the bus.
  const onView = promo => bus.next({ type: 'view', promo })

  // A function that emits a `refresh` event on the bus.
  const onRefresh = promo => bus.next({ type: 'refresh', promo })

  // Create the initial state object.
  const initialState = { seed, user }

  // The stateful signal emits the current placement engine state whenever an
  // event is emitted on the bus.
  const statefulSignal = bus
    // Throttle events to a maximum rate of one per second.
    .throttle(1000)

    // Emit an initial `visit` event on the bus.
    .startWith({ type: 'visit' })

    // Run the state machine function over the events emitted on the bus.
    .stateMachine(stateMachine(storage, promos, custom), initialState)

    // Emit the placed promos and callback functions.
    .map(({ promos }) => ({ promos, onClick, onClose, onView, onRefresh }))

  return statefulSignal
}

export default placementEngine
