// Mock the lodash sample function to just return the last value in the array.
jest.mock('lodash/sample', () => {
  return jest.fn(values => values[values.length - 1])
})

const sample = require('lodash/sample')
const placementEngine = require('./placementEngine')

describe('placementEngine', () => {
  const promo1 = { id: 1, groupId: 1 }
  const promo2 = { id: 1, groupId: 2 }
  const promo3 = { id: 2, groupId: 2 }
  const promo4 = { id: 3, groupId: 3, constraints: 'url = "lorem"' }
  const promo5 = { id: 4, groupId: 3, constraints: 'url = "ipsum"' }
  const promos = [promo1, promo2, promo3, promo4, promo5]

  it('ensures only one promo from each group is picked', () => {
    expect(placementEngine(promos)).toEqual([promo1, promo3])
  })

  it('filters the promos that have constraints', () => {
    expect(placementEngine(promos, { url: 'lorem' })).toEqual([promo1, promo3, promo4])
  })
})
