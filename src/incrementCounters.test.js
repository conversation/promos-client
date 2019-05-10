import incrementCounters from './incrementCounters'

describe('incrementCounters', () => {
  it('initialises the counters when given an empty state', () => {
    const promo = { campaignId: 1, groupId: 2, promoId: 3 }
    const f = incrementCounters('foo', '123', promo)
    const state = {}
    expect(f(state)).toHaveProperty('foo', {
      campaigns: { 1: { count: 1, timestamp: '123' } },
      groups: { 2: { count: 1, timestamp: '123' } },
      promos: { 3: { count: 1, timestamp: '123' } }
    })
  })

  it('increments the counters when given an existing state', () => {
    const promo = { campaignId: 1, groupId: 2, promoId: 3 }
    const f = incrementCounters('foo', '123', promo)
    const state = {
      foo: {
        campaigns: { 1: { count: 1, timestamp: '123' } },
        groups: { 2: { count: 1, timestamp: '123' } },
        promos: { 3: { count: 1, timestamp: '123' } }
      }
    }
    expect(f(state)).toHaveProperty('foo', {
      campaigns: { 1: { count: 2, timestamp: '123' } },
      groups: { 2: { count: 2, timestamp: '123' } },
      promos: { 3: { count: 2, timestamp: '123' } }
    })
  })

  it('returns the state unmodified if a property is missing', () => {
    const promo = { campaignId: null, groupId: null, promoId: null }
    const f = incrementCounters('foo', '123', promo)
    const state = {
      foo: {
        campaigns: { 1: { count: 1, timestamp: '123' } },
        groups: { 2: { count: 1, timestamp: '123' } },
        promos: { 3: { count: 1, timestamp: '123' } }
      }
    }
    expect(f(state)).toHaveProperty('foo', {
      campaigns: { 1: { count: 1, timestamp: '123' } },
      groups: { 2: { count: 1, timestamp: '123' } },
      promos: { 3: { count: 1, timestamp: '123' } }
    })
  })
})
