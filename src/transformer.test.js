import transformer from './transformer'

// Mock the placePromos function to return the promos unchanged.
jest.mock('./placePromos', () =>
  jest.fn(promos => promos)
)

jest.mock('./utils', () => ({
  timestamp: jest.fn(() => '123')
}))

describe('transformer', () => {
  const state = {
    promos: [
      { promoId: 1, groupId: 1, campaignId: 1 },
      { promoId: 2, groupId: 1, campaignId: 1 },
      { promoId: 3, campaignId: 1 }
    ],
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
      const result = transformer(state, event)
      expect(result).toHaveProperty('user.impressions.campaigns', {
        1: { count: 3, timestamp: '123' }
      })
    })

    it('updates the group impressions', () => {
      const result = transformer(state, event)
      expect(result).toHaveProperty('user.impressions.groups', {
        1: { count: 2, timestamp: '123' }
      })
    })

    it('updates the promo impressions', () => {
      const result = transformer(state, event)
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
      const result = transformer(state, event)
      expect(result).toHaveProperty('user.visits', 2)
    })
  })

  describe('with a close event', () => {
    const event = {
      type: 'close',
      promo: { promoId: 1, groupId: 1, campaignId: 1 }
    }

    it('adds the campaign to the list of blocked promos', () => {
      const result = transformer(state, event)
      expect(result).toHaveProperty('user.blocked.campaigns', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('adds the group to the list of blocked promos', () => {
      const result = transformer(state, event)
      expect(result).toHaveProperty('user.blocked.groups', {
        1: { count: 1, timestamp: '123' }
      })
    })

    it('adds the promo to the list of blocked promos', () => {
      const result = transformer(state, event)
      expect(result).toHaveProperty('user.blocked.promos', {
        1: { count: 1, timestamp: '123' }
      })
    })
  })
})
