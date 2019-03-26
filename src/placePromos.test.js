// Mock the sample function to return the first `n` elements of a list.
jest.mock('fkit/dist/sample', () =>
  jest.fn((n, values) => values.slice(0, n))
)

const placePromos = require('./placePromos')

describe('placePromos', () => {
  const promo1 = { id: 1, groupId: null }
  const promo2 = { id: 2, groupId: null }
  const promo3 = { id: 3, groupId: 1 }
  const promo4 = { id: 4, groupId: 1 }
  const promo5 = { id: 5, groupId: 2, constraints: 'url = "foo"' }
  const promo6 = { id: 6, groupId: 2, constraints: 'url = "bar"' }
  const promo7 = { id: 7, groupId: 3, constraints: 'blocked CONTAINS promo.id' }
  const promos = [promo1, promo2, promo3, promo4, promo5, promo6, promo7]

  it('ensures only one promo from each group is placed', () => {
    expect(placePromos(promos, {})).toEqual([promo1, promo2, promo3])
  })

  it('allows filtering promos by constraints', () => {
    expect(placePromos(promos, { url: 'foo' })).toEqual([promo1, promo2, promo3, promo5])
    expect(placePromos(promos, { url: 'bar' })).toEqual([promo1, promo2, promo3, promo6])
  })

  it('allows filtering promos by properties of the promo', () => {
    expect(placePromos(promos, { blocked: [7] })).toEqual([promo1, promo2, promo3, promo7])
  })
})
