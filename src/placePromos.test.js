import placePromos from './placePromos'

describe('placePromos', () => {
  const seed = 123
  const a = { promoId: 1, groupId: null }
  const b = { promoId: 2, groupId: null }
  const c = { promoId: 3, groupId: 1 }
  const d = { promoId: 4, groupId: 1 }
  const e = { promoId: 5, groupId: 2, constraints: 'x = "foo"' }
  const f = { promoId: 6, groupId: 2, constraints: 'x = "bar"' }
  const g = { promoId: 7, groupId: 3, constraints: 'x = promoId' }
  const promos = [a, b, c, d, e, f, g]

  it('returns the promos that have satisfied constraints', () => {
    expect(placePromos(seed, promos, {})).toEqual([a, b, c])
    expect(placePromos(seed, promos, { x: 'foo' })).toEqual([a, b, c, e])
    expect(placePromos(seed, promos, { x: 'bar' })).toEqual([a, b, c, f])
    expect(placePromos(seed, promos, { x: 7 })).toEqual([a, b, c, g])
  })
})
