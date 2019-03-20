// Mock the sample function to just return the last `n` elements of a list.
jest.mock('fkit/dist/sample', () => {
  return jest.fn((n, values) => values.slice(values.length - n, values.length))
})

const sample = require('fkit/dist/sample')

const placementEngine = require('./placementEngine')

describe('placementEngine', () => {
  const promo1 = { id: 1, groupId: 1 }
  const promo2 = { id: 1, groupId: 2 }
  const promo3 = { id: 2, groupId: 2 }
  const promo4 = { id: 3, groupId: 3, constraints: 'url = "lorem"' }
  const promo5 = { id: 4, groupId: 3, constraints: 'url = "ipsum"' }
  const promos = [promo1, promo2, promo3, promo4, promo5]

  it('ensures only one promo from each group is placed', () => {
    expect(placementEngine({}, promos)).toEqual([promo1, promo3])
  })

  it('filters promos with matching constraints', () => {
    expect(placementEngine({ url: 'lorem' }, promos)).toEqual([promo1, promo3, promo4])
    expect(placementEngine({ url: 'ipsum' }, promos)).toEqual([promo1, promo3, promo5])
  })
})
