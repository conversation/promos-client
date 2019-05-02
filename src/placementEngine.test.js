import placementEngine from './placementEngine'
import { get, set } from './userState'

// Mock the placePromos function to return the promos unchanged.
jest.mock('./placePromos', () => jest.fn(promos => promos))

jest.mock('./userState', () => ({
  get: jest.fn(),
  set: jest.fn()
}))

// Mock the timestamp function.
jest.mock('./utils', () => ({ timestamp: jest.fn(() => '123') }))

describe('placementEngine', () => {
  const promos = [
    { promoId: 1, groupId: 1, campaignId: 1 },
    { promoId: 2, groupId: 1, campaignId: 1 },
    { promoId: 3, campaignId: 1 }
  ]

  const state = {
    blocked: {},
    impressions: {},
    engagements: {},
    visits: 0
  }

  get.mockReturnValue(state)

  it('returns a promise that resolves the placed promos', () => {
    const result = placementEngine(promos, window)
    return expect(result).resolves.toHaveProperty('promos', promos)
  })

  it('increments the number of visits', () => {
    placementEngine(promos, window)
    expect(set).toHaveBeenLastCalledWith(
      window.localStorage,
      expect.objectContaining({
        visits: 1
      })
    )
  })

  describe('onClick', () => {
    it('updates the campaign engagements', () => {
      return placementEngine(promos, window).then(({ onClick }) => {
        onClick(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          window.localStorage,
          expect.objectContaining({
            engagements: expect.objectContaining({
              campaigns: { 1: { count: 1, timestamp: '123' } }
            })
          })
        )
      })
    })

    it('updates the group engagements', () => {
      return placementEngine(promos, window).then(({ onClick }) => {
        onClick(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          window.localStorage,
          expect.objectContaining({
            engagements: expect.objectContaining({
              groups: { 1: { count: 1, timestamp: '123' } }
            })
          })
        )
      })
    })

    it('updates the promo engagements', () => {
      return placementEngine(promos, window).then(({ onClick }) => {
        onClick(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          window.localStorage,
          expect.objectContaining({
            engagements: expect.objectContaining({
              promos: { 1: { count: 1, timestamp: '123' } }
            })
          })
        )
      })
    })
  })

  describe('onClose', () => {
    it('updates the blocked campaigns', () => {
      return placementEngine(promos, window).then(({ onClose }) => {
        onClose(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          window.localStorage,
          expect.objectContaining({
            blocked: expect.objectContaining({
              campaigns: { 1: { count: 1, timestamp: '123' } }
            })
          })
        )
      })
    })

    it('updates the blocked groups', () => {
      return placementEngine(promos, window).then(({ onClose }) => {
        onClose(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          window.localStorage,
          expect.objectContaining({
            blocked: expect.objectContaining({
              groups: { 1: { count: 1, timestamp: '123' } }
            })
          })
        )
      })
    })

    it('updates the blocked promos', () => {
      return placementEngine(promos, window).then(({ onClose }) => {
        onClose(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          window.localStorage,
          expect.objectContaining({
            blocked: expect.objectContaining({
              promos: { 1: { count: 1, timestamp: '123' } }
            })
          })
        )
      })
    })
  })

  describe('onView', () => {
    it('updates the campaign impressions', () => {
      return placementEngine(promos, window).then(({ onView }) => {
        onView(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          window.localStorage,
          expect.objectContaining({
            impressions: expect.objectContaining({
              campaigns: { 1: { count: 1, timestamp: '123' } }
            })
          })
        )
      })
    })

    it('updates the group impressions', () => {
      return placementEngine(promos, window).then(({ onView }) => {
        onView(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          window.localStorage,
          expect.objectContaining({
            impressions: expect.objectContaining({
              groups: { 1: { count: 1, timestamp: '123' } }
            })
          })
        )
      })
    })

    it('updates the promo impressions', () => {
      return placementEngine(promos, window).then(({ onView }) => {
        onView(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          window.localStorage,
          expect.objectContaining({
            impressions: expect.objectContaining({
              promos: { 1: { count: 1, timestamp: '123' } }
            })
          })
        )
      })
    })
  })
})
