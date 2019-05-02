import placePromos from './placePromos'

// Mock the sample function to return the first `n` elements of a list.
jest.mock('fkit/dist/sample', () =>
  jest.fn((n, values) => values.slice(0, n))
)

describe('placePromos', () => {
  const a = { promoId: 1, groupId: null }
  const b = { promoId: 2, groupId: null }
  const c = { promoId: 3, groupId: 1 }
  const d = { promoId: 4, groupId: 1 }
  const e = { promoId: 5, groupId: 2, constraints: 'user.url = "foo"' }
  const f = { promoId: 6, groupId: 2, constraints: 'user.url = "bar"' }
  const g = { promoId: 8, groupId: 3, constraints: 'browser.name = "Chrome"' }
  const h = { promoId: 7, groupId: 3, constraints: 'promoId IN user.blocked.promos' }
  const promos = [a, b, c, d, e, f, g, h]

  it('ensures only one promo from each group is placed', () => {
    expect(placePromos({}, promos)).toEqual([a, b, c])
  })

  it('allows filtering promos by user', () => {
    expect(placePromos({ user: { url: 'foo' } }, promos)).toEqual([a, b, c, e])
    expect(placePromos({ user: { url: 'bar' } }, promos)).toEqual([a, b, c, f])
  })

  it('allows filtering promos by user agent', () => {
    const window = { navigator: { userAgent: 'Chrome/72.0.3626.121' } }
    expect(placePromos({ window }, promos)).toEqual([a, b, c, g])
  })

  it('allows filtering promos by promoId', () => {
    expect(placePromos({ user: { blocked: { promos: [7] } } }, promos)).toEqual([a, b, c, h])
  })
})
