import reducer from './reducer'

// Mock the placePromos function to return the promos unchanged.
jest.mock('./placePromos', () =>
  jest.fn(promos => promos)
)

jest.mock('./utils', () => ({
  timestamp: jest.fn(() => '123')
}))

describe('reducer', () => {
  const promos = [
    { promoId: 1, groupId: 1, campaignId: 1 },
    { promoId: 2, groupId: 1, campaignId: 1 },
    { promoId: 3, campaignId: 1 }
  ]
  const context = { window, promos }
  const state = {
    promos: [],
    user: {
      blocked: {},
      impressions: {},
      visits: 1
    },
    window: {}
  }

  describe('with any event', () => {
    const event = {}

    it('updates the campaign impressions', () => {
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.impressions.campaigns', {
        1: { count: 3, timestamp: '123' }
      })
    })

    it('updates the group impressions', () => {
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.impressions.groups', {
        1: { count: 2, timestamp: '123' }
      })
    })

    it('updates the promo impressions', () => {
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.impressions.promos', {
        1: { count: 1, timestamp: '123' },
        2: { count: 1, timestamp: '123' },
        3: { count: 1, timestamp: '123' }
      })
    })
  })

  describe('with a visit event', () => {
    it('increments the number of visits', () => {
      const event = { type: 'visit' }
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.visits', 2)
    })
  })

  describe('with a click event', () => {
    const event = {
      type: 'click',
      promo: { promoId: 1, groupId: 1, campaignId: 1 }
    }

    it('updates the campaign engagements', () => {
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.engagements.campaigns', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the group engagements', () => {
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.engagements.groups', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the promo engagements', () => {
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.engagements.promos', {
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
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.blocked.campaigns', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the blocked groups', () => {
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.blocked.groups', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('updates the blocked promos', () => {
      const result = reducer(context, state, event)
      expect(result).toHaveProperty('user.blocked.promos', {
        1: { count: 1, timestamp: '123' }
      })
    })
  })
})
