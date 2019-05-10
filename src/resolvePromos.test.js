import mockStorage from './mockStorage'
import resolvePromos from './resolvePromos'

describe('resolvePromos', () => {
  const a = { promoId: 1, groupId: 1, campaignId: 1 }
  const b = { promoId: 2, groupId: 2, campaignId: 1 }
  const c = { promoId: 3, groupId: 3, campaignId: 1 }
  const promos = [a, b, c]
  const storage = mockStorage()

  it('returns a promise that resolves the given promos', () => {
    const promise = resolvePromos(storage, promos)
    return expect(promise).resolves.toHaveProperty('promos', promos)
  })

  it('updates the engagements when the onClick callback is called', () => {
    return resolvePromos(storage, promos).then(({ onClick }) => {
      onClick(a)
      expect(storage.state).toMatchObject({
        user: {
          engagements: {
            campaigns: { 1: { count: 1, timestamp: expect.any(String) } },
            groups: { 1: { count: 1, timestamp: expect.any(String) } },
            promos: { 1: { count: 1, timestamp: expect.any(String) } }
          }
        }
      })
    })
  })

  it('updates the blocked promos when the onClose callback is called', () => {
    return resolvePromos(storage, promos).then(({ onClose }) => {
      onClose(a)
      expect(storage.state).toMatchObject({
        user: {
          blocked: {
            campaigns: { 1: { count: 1, timestamp: expect.any(String) } },
            groups: { 1: { count: 1, timestamp: expect.any(String) } },
            promos: { 1: { count: 1, timestamp: expect.any(String) } }
          }
        }
      })
    })
  })

  it('updates the impressions when the onView callback is called', () => {
    return resolvePromos(storage, promos).then(({ onView }) => {
      onView(a)
      expect(storage.state).toMatchObject({
        user: {
          impressions: {
            campaigns: { 1: { count: 1, timestamp: expect.any(String) } },
            groups: { 1: { count: 1, timestamp: expect.any(String) } },
            promos: { 1: { count: 1, timestamp: expect.any(String) } }
          }
        }
      })
    })
  })
})
