import mockStorage from './mockStorage'
import placementEngine from './placementEngine'

describe('placementEngine', () => {
  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
  const a = { promoId: 1 }
  const b = { promoId: 2, constraints: 'user.visits > 1' }
  const c = { promoId: 3, constraints: 'browser.name = "Chrome"' }
  const d = { promoId: 4, groupId: 1, constraints: 'groupId NOT IN user.blocked.groups' }
  const promos = [a, b, c, d]

  // Stub the user agent.
  Object.defineProperty(window.navigator, 'userAgent', { value: userAgent })

  it('increments the number of visits', () => {
    const storage = mockStorage()
    placementEngine(storage, promos)
    expect(storage.state).toMatchObject({ user: { visits: 1 } })
  })

  it('resolves the promos that have satisfied constraints', () => {
    const storage = mockStorage({
      user: {
        blocked: { groups: [1] },
        visits: 1
      }
    })
    const promise = placementEngine(storage, promos)
    return expect(promise).resolves.toHaveProperty('promos', [a, b, c])
  })
})
