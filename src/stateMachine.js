import curry from 'fkit/dist/curry'
import inc from 'fkit/dist/inc'
import update from 'fkit/dist/update'

import createContext from './createContext'
import incrementCounters from './incrementCounters'
import placePromos from './placePromos'
import { setUser } from './userState'
import { timestamp } from './utils'

// Increments the number of visits for the user.
const incrementVisits = update('visits', inc)

// Adds the given promo to the list of blocked promos for the user.
const blockPromo = incrementCounters('blocked')

// Tracks an impression for the given promo.
const trackImpression = incrementCounters('impressions')

// Tracks an engagement for the given promo.
const trackEngagement = incrementCounters('engagements')

/**
 * Applies an event to the current state to yield a new state.
 *
 * @param {Storage} storage The storage object.
 * @param {Array} promos The list of promos.
 * @param {Object} custom The custom state object.
 * @param {Object} state The current state.
 * @param {Object} event The event.
 * @param {Object} emit The emitter object.
 * @returns A new state.
 */
const stateMachine = (storage, promos, custom = {}) => ({ seed, user }, event, emit) => {
  const ts = timestamp()

  if (event.type === 'visit') {
    user = incrementVisits(user)
  } else if (event.type === 'click') {
    user = trackEngagement(ts, event.promo)(user)
  } else if (event.type === 'close') {
    user = blockPromo(ts, event.promo)(user)
  } else if (event.type === 'view') {
    user = trackImpression(ts, event.promo)(user)
  }

  // Create a context.
  const context = createContext(user, custom)

  // Place the promos.
  const placedPromos = placePromos(seed, promos, context)

  // This is where the promos are actually emitted. i.e. They will only be
  // emitted on the initial `visit` event. Any other events will not trigger
  // the promos to be placed again (although they will update the internal
  // user state object).
  emit.next({ promos: placedPromos })

  // Store the user state as a side effect.
  setUser(storage, user)

  return { seed, user }
}

export default curry(stateMachine)
