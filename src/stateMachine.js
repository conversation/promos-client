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
* Return a transform function that takes a state, an event, and an emitter
* object. When called, the transform function returns a new state and optionally
* emits an event.
 *
 * @param {Storage} storage The storage object.
 * @param {Array} promos The list of promos.
 * @param {Object} custom The custom state object.
 * @returns A new state.
 */
export default function stateMachine (storage, promos, custom = {}) {
  return ({ seeds, user }, event, emit) => {
    const ts = timestamp()

    // Update the user state based on the event type.
    if (event.type === 'visit') {
      user = incrementVisits(user)
    } else if (event.type === 'click') {
      user = trackEngagement(ts, event.promo)(user)
    } else if (event.type === 'close') {
      user = blockPromo(ts, event.promo)(user)
    } else if (event.type === 'view') {
      user = trackImpression(ts, event.promo)(user)
    }

    // Place and emit the promos.
    if (event.type === 'visit' || event.type === 'refresh') {
      const context = createContext(user, custom)
      const placedPromos = placePromos(seeds, promos, context)
      emit.next({ promos: placedPromos })
    }

    // Store the user state as a side effect.
    setUser(storage, user)

    return { seeds, user }
  }
}
