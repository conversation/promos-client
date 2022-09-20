import { Subject } from 'rxjs'
import { filter, map, scan, startWith } from 'rxjs/operators'
import groupBy from 'fkit/dist/groupBy'
import keys from 'fkit/dist/keys'
import set from 'fkit/dist/set'
import stateMachine from './stateMachine'
import { getUser } from './userState'
import { seedGenerator } from './utils'

/**
 * Returns a map from promo groups to seed values.
 *
 * @private
 */
function createGroupSeeds (promos) {
  const seed = seedGenerator()
  const groupIds = keys(groupBy('groupId', promos))
  return groupIds.reduce((seeds, groupId) =>
    set(groupId, seed(), seeds)
  , {})
}

/**
 * The placement engine is responsible for filtering promos based on certain
 * rules (e.g. constraints). It returns a signal that emits objects with the
 * following shape:
 *
 * - `promos`: The list of placed promos.
 * - `onClick`: The callback function that should be called if the user clicks a
 *   promo.
 * - `onClose`: The callback function that should be called if the user
 *   dismisses a promo.
 * - `onView`: The callback function that should be called if the user views a
 *   promo.
 *
 * @param {?Storage} storage The storage object.
 * @param {Array} promos The list of the candidate promos.
 * @param {Object} custom The custom state object.
 * @returns {Signal} A signal.
 */
function placementEngine (storage, promos, custom = {}) {
  // Create a seed for each promo group.
  const seeds = createGroupSeeds(promos)

  // Load the user state.
  const user = getUser(storage)

  // Create the subject.
  const subject = new Subject()

  // A function that emits a `click` event on the subject.
  const onClick = promo => subject.next({ type: 'click', promo })

  // A function that emits a `close` event on the subject.
  const onClose = promo => subject.next({ type: 'close', promo })

  // A function that emits a `view` event on the subject.
  const onView = promo => subject.next({ type: 'view', promo })

  // A function that emits a `refresh` event on the subject.
  const onRefresh = () => subject.next({ type: 'refresh' })

  // Create the initial state object.
  const initialState = { seeds, user, custom }

  // The stateful signal emits the current placement engine state whenever an event is emitted on
  // the subject.
  const statefulSignal = subject
    .pipe(
      startWith({ type: 'visit' }),

      // Run the state machine function over the events emitted on the bus.
      scan(stateMachine(storage, promos), initialState),

      // Don't emit the state if it doesn't contain any promos.
      filter(({ promos }) => promos),

      // Emit the placed promos and callback functions.
      map(({ promos }) => ({ promos, onClick, onClose, onView, onRefresh }))
    )

  return statefulSignal
}

export default placementEngine
