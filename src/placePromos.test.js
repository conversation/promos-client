import placePromos from './placePromos'

// Mock the sample function to return the first `n` elements of a list. This is
// so that we can predictably test the placements.
jest.mock('fkit/dist/sample', () =>
  jest.fn((n, values) => values.slice(0, n))
)

describe('placePromos', () => {
  const a = { promoId: 1, groupId: null }
  const b = { promoId: 2, groupId: null }
  const c = { promoId: 3, groupId: 1 }
  const d = { promoId: 4, groupId: 1 }
  const e = { promoId: 5, groupId: 2, constraints: 'x = "foo"' }
  const f = { promoId: 6, groupId: 2, constraints: 'x = "bar"' }
  const g = { promoId: 7, groupId: 3, constraints: 'x = promoId' }
  const promos = [a, b, c, d, e, f, g]

  it('returns the promos that have satisfied constraints', () => {
    expect(placePromos(promos, {})).toEqual([a, b, c])
    expect(placePromos(promos, { x: 'foo' })).toEqual([a, b, c, e])
    expect(placePromos(promos, { x: 'bar' })).toEqual([a, b, c, f])
    expect(placePromos(promos, { x: 7 })).toEqual([a, b, c, g])
  })
})
