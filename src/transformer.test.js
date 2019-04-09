import transformer from './transformer'

describe('transformer', () => {
  const state = {
    promos: [{ promoId: 1 }, { promoId: 2 }, { promoId: 3 }],
    user: { blocked: [], impressions: [], visits: 1 },
    window: {}
  }

  describe('with any event', () => {
    it('adds the promos to the list of impressions', () => {
      const event = {}
      expect(transformer(state, event)).toHaveProperty('user.impressions', [1, 2, 3])
    })
  })

  describe('with a visit event', () => {
    it('increments the number of visits', () => {
      const event = { type: 'visit' }
      expect(transformer(state, event)).toHaveProperty('user.visits', 2)
    })
  })

  describe('with a close event', () => {
    it('adds the promo to the list of blocked promos', () => {
      const event = { type: 'close', promo: { promoId: 1 } }
      expect(transformer(state, event)).toHaveProperty('user.blocked', [1])
    })
  })
})
