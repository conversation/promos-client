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

// Gives the user the ability to specify data return types by name in a constraint. Eg. data.selectedNewsletter in a constraint will then pull
// the selectedNewsletter property for use
function extractDataFieldsFromPromos (promos) {
  const fieldSet = new Set()
  const regex = /data\.([a-zA-Z0-9_]+)/g // if the constraint contains data.XYZ pull the property from the query.
  promos.forEach(promo => {
    const constraint = promo.constraints || promo.query || ''
    let match
    while ((match = regex.exec(constraint)) !== null) {
      fieldSet.add(match[1])
    }
  })
  return Array.from(fieldSet)
}

/**
* Return a transform function that takes a state, an event, and an emitter
* object. When called, the transform function returns a new state and optionally
* emits an event.
 *
 * @param {Storage} storage The storage object.
 * @param {Array} promos The list of promos.
 * @returns A new state.
 */
export default function stateMachine (storage, promos) {
  return ({ seeds, user, custom }, event) => {
    const ts = timestamp()
    const customState = event.custom || custom

    // Update the user state based on the event type.
    if (event.type === 'visit') {
      user = incrementVisits(user)
    } else if (event.type === 'click') {
      user = trackEngagement(ts, event.promo)(user)
    } else if (event.type === 'close') {
      user = blockPromo(ts, event.promo)(user)
    } else if (event.type === 'view') {
      user = trackImpression(ts, event.promo)(user)
    } else if (event.type === 'donationsLoaded') {
      user = { ...user, donations: event.donations }
    } else if (event.type === 'newslettersLoaded') {
      user = { ...user, newsletters: event.newsletters }
    }

    let placedPromos = null

    // Place and emit the promos.
    if (event.type === 'visit' || event.type === 'refresh') {
      const context = createContext(user, customState)
      const dataFields = extractDataFieldsFromPromos(promos)
      placedPromos = placePromos(seeds, promos, context, dataFields)
    }

    // Store the user state as a side effect.
    setUser(storage, user)

    return { seeds, user, custom: customState, promos: placedPromos }
  }
}
