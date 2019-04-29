import reducer from './reducer'

// Mock the placePromos function to return the promos unchanged.
jest.mock('./placePromos', () =>
  jest.fn(promos => promos)
)

jest.mock('./utils', () => ({
  timestamp: jest.fn(() => '123')
}))

let state

describe('reducer', () => {
  const promos = [
    { promoId: 1, groupId: 1, campaignId: 1 },
    { promoId: 2, groupId: 1, campaignId: 1 },
    { promoId: 3, campaignId: 1 }
  ]

  beforeEach(() => {
    state = {
      promos: [],
      user: {
        blocked: {},
        impressions: {},
        engagements: {},
        visits: 1
      },
      window: {}
    }
  })

  describe('with any event', () => {
    const event = {}

    it('updates the promos', () => {
      expect(state).toHaveProperty('promos', [])
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('promos', promos)
    })

    it('updates the campaign impressions', () => {
      expect(state).not.toHaveProperty('user.impressions.campaigns')
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('user.impressions.campaigns', {
        1: { count: 3, timestamp: '123' }
      })
    })

    it('updates the group impressions', () => {
      expect(state).not.toHaveProperty('user.impressions.groups')
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('user.impressions.groups', {
        1: { count: 2, timestamp: '123' }
      })
    })

    it('updates the promo impressions', () => {
      expect(state).not.toHaveProperty('user.impressions.promos')
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('user.impressions.promos', {
        1: { count: 1, timestamp: '123' },
        2: { count: 1, timestamp: '123' },
        3: { count: 1, timestamp: '123' }
      })
    })
  })

  describe('with a visit event', () => {
    const event = { type: 'visit' }

    it('increments the number of visits', () => {
      expect(state).toHaveProperty('user.visits', 1)
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('user.visits', 2)
    })
  })

  describe('with a click event', () => {
    const event = {
      type: 'click',
      promo: { promoId: 1, groupId: 1, campaignId: 1 }
    }

    it('updates the campaign engagements', () => {
      expect(state).not.toHaveProperty('user.engagements.campaigns')
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('user.engagements.campaigns', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the group engagements', () => {
      expect(state).not.toHaveProperty('user.engagements.groups')
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('user.engagements.groups', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the promo engagements', () => {
      expect(state).not.toHaveProperty('user.engagements.promos')
      state = reducer(promos, window, state, event)
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

    it('updates the blocked campaigns', () => {
      expect(state).not.toHaveProperty('user.blocked.campaigns')
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('user.blocked.campaigns', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the blocked groups', () => {
      expect(state).not.toHaveProperty('user.blocked.groups')
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('user.blocked.groups', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the blocked promos', () => {
      expect(state).not.toHaveProperty('user.blocked.promos')
      state = reducer(promos, window, state, event)
      expect(state).toHaveProperty('user.blocked.promos', {
        1: { count: 1, timestamp: '123' }
      })
    })
  })
})
