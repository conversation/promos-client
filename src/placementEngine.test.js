// Mock the sample function to just return the last `n` elements of a list.
jest.mock('fkit/dist/sample', () => {
  return jest.fn((n, values) => values.slice(values.length - n, values.length))
})

const placementEngine = require('./placementEngine')

describe('placementEngine', () => {
  const promo1 = { id: 1, groupId: null }
  const promo2 = { id: 2, groupId: null }
  const promo3 = { id: 3, groupId: 1 }
  const promo4 = { id: 4, groupId: 1 }
  const promo5 = { id: 5, groupId: 2, constraints: 'url = "foo"' }
  const promo6 = { id: 6, groupId: 2, constraints: 'url = "bar"' }
  const promo7 = { id: 7, groupId: 3, constraints: 'blocked CONTAINS promo.id' }
  const promos = [promo1, promo2, promo3, promo4, promo5, promo6, promo7]

  it('ensures only one promo from each group is placed', () => {
    expect(placementEngine({}, promos)).toEqual([promo1, promo2, promo4])
  })

  it('allows filtering promos by constraints', () => {
    expect(placementEngine({ url: 'foo' }, promos)).toEqual([promo1, promo2, promo4, promo5])
    expect(placementEngine({ url: 'bar' }, promos)).toEqual([promo1, promo2, promo4, promo6])
  })

  it('allows filtering promos by properties of the promo', () => {
    expect(placementEngine({ blocked: [7] }, promos)).toEqual([promo1, promo2, promo4, promo7])
  })
})
