import mockStorage from './mockStorage'
import stateMachine from './stateMachine'
import { setUser } from './userState'

// Mock the createContext function.
jest.mock('./createContext', () => jest.fn((user) => ({ user })))

// Mock the placePromos function to return the promos unchanged.
jest.mock('./placePromos', () =>
  jest.fn((seed, promos, context) => promos)
)

// Mock the user state setter.
jest.mock('./userState', () => ({ setUser: jest.fn() }))

// Mock utils functions.
jest.mock('./utils', () => ({
  timestamp: jest.fn(() => '123'),
  prng: Math.random
}))

let state

describe('stateMachine', () => {
  const promos = [
    { promoId: 1, groupId: 1, campaignId: 1 },
    { promoId: 2, groupId: 1, campaignId: 1 },
    { promoId: 3, campaignId: 1 }
  ]
  const emit = { next: jest.fn() }
  const storage = mockStorage()

  beforeEach(() => {
    state = {
      user: {
        blocked: {},
        impressions: {},
        engagements: {},
        visits: 1
      }
    }
  })

  describe('with any event', () => {
    const event = {}

    it('loads and stores the user state', () => {
      stateMachine(storage, promos)(state, event, emit)
      expect(setUser).toHaveBeenLastCalledWith(storage, state.user)
    })
  })

  describe('with a visit event', () => {
    const event = { type: 'visit' }

    it('emits the placed promos', () => {
      stateMachine(storage, promos)(state, event, emit)
      expect(emit.next).toHaveBeenLastCalledWith({ promos })
    })

    it('increments the number of visits', () => {
      expect(state).toHaveProperty('user.visits', 1)
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.visits', 2)
    })
  })

  describe('with a click event', () => {
    const event = {
      type: 'click',
      promo: { promoId: 1, groupId: 1, campaignId: 1 }
    }

    it('emits the placed promos', () => {
      stateMachine(storage, promos)(state, event, emit)
      expect(emit.next).toHaveBeenLastCalledWith({ promos })
    })

    it('updates the campaign engagements', () => {
      expect(state).not.toHaveProperty('user.engagements.campaigns')
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.engagements.campaigns', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the group engagements', () => {
      expect(state).not.toHaveProperty('user.engagements.groups')
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.engagements.groups', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the promo engagements', () => {
      expect(state).not.toHaveProperty('user.engagements.promos')
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.engagements.promos', {
        1: { count: 1, timestamp: '123' }
      })
    })
  })

  describe('with a close event', () => {
    const event = {
      type: 'close',
      promo: { promoId: 1, groupId: 1, campaignId: 1 }
    }

    it('emits the placed promos', () => {
      stateMachine(storage, promos)(state, event, emit)
      expect(emit.next).toHaveBeenLastCalledWith({ promos })
    })

    it('updates the blocked campaigns', () => {
      expect(state).not.toHaveProperty('user.blocked.campaigns')
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.blocked.campaigns', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the blocked groups', () => {
      expect(state).not.toHaveProperty('user.blocked.groups')
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.blocked.groups', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the blocked promos', () => {
      expect(state).not.toHaveProperty('user.blocked.promos')
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.blocked.promos', {
        1: { count: 1, timestamp: '123' }
      })
    })
  })

  describe('with a view event', () => {
    const event = {
      type: 'view',
      promo: { promoId: 1, groupId: 1, campaignId: 1 }
    }

    it('emits the placed promos', () => {
      stateMachine(storage, promos)(state, event, emit)
      expect(emit.next).toHaveBeenLastCalledWith({ promos })
    })

    it('updates the campaign impressions', () => {
      expect(state).not.toHaveProperty('user.impressions.campaigns')
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.impressions.campaigns', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the group impressions', () => {
      expect(state).not.toHaveProperty('user.impressions.groups')
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.impressions.groups', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the promo impressions', () => {
      expect(state).not.toHaveProperty('user.impressions.promos')
      state = stateMachine(storage, promos)(state, event, emit)
      expect(state).toHaveProperty('user.impressions.promos', {
        1: { count: 1, timestamp: '123' }
      })
    })
  })
})
