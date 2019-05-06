import placePromos from './placePromos'
import placementEngine from './placementEngine'
import { get, set } from './userState'

// Mock the placePromos function to return the promos unchanged.
jest.mock('./placePromos', () => jest.fn((context, promos) => promos))

jest.mock('./userState', () => ({
  get: jest.fn(),
  set: jest.fn((storage, user) => user)
}))

describe('placementEngine', () => {
  const promos = [
    { promoId: 1, groupId: 1, campaignId: 1 },
    { promoId: 2, groupId: 1, campaignId: 1 },
    { promoId: 3, campaignId: 1 }
  ]
  const storage = jest.fn()
  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
  const user = {
    blocked: {},
    impressions: {},
    engagements: {},
    visits: 0
  }

  get.mockReturnValue(user)

  it('returns a promise that resolves the placed promos', () => {
    const result = placementEngine({ promos, storage, userAgent })
    return expect(result).resolves.toHaveProperty('promos', promos)
  })

  it('passes a context to the placePromos function', () => {
    placementEngine({ promos, storage, userAgent })
    expect(placePromos).toHaveBeenLastCalledWith(
      expect.objectContaining({
        browser: { major: '74', name: 'Chrome', version: '74.0.3729.131' },
        device: {},
        os: { name: 'Mac OS', version: '10.14.4' },
        window,
        age: expect.any(Function),
        lower: expect.any(Function),
        upper: expect.any(Function)
      }),
      promos
    )
  })

  it('increments the number of visits', () => {
    placementEngine({ promos, storage, userAgent })
    expect(set).toHaveBeenLastCalledWith(
      storage,
      expect.objectContaining({
        visits: 1
      })
    )
  })

  describe('onClick', () => {
    it('updates the campaign engagements', () => {
      return placementEngine({ promos, storage, userAgent }).then(({ onClick }) => {
        onClick(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          storage,
          expect.objectContaining({
            engagements: expect.objectContaining({
              campaigns: { 1: { count: 1, timestamp: expect.any(String) } }
            })
          })
        )
      })
    })

    it('updates the group engagements', () => {
      return placementEngine({ promos, storage, userAgent }).then(({ onClick }) => {
        onClick(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          storage,
          expect.objectContaining({
            engagements: expect.objectContaining({
              groups: { 1: { count: 1, timestamp: expect.any(String) } }
            })
          })
        )
      })
    })

    it('updates the promo engagements', () => {
      return placementEngine({ promos, storage, userAgent }).then(({ onClick }) => {
        onClick(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          storage,
          expect.objectContaining({
            engagements: expect.objectContaining({
              promos: { 1: { count: 1, timestamp: expect.any(String) } }
            })
          })
        )
      })
    })
  })

  describe('onClose', () => {
    it('updates the blocked campaigns', () => {
      return placementEngine({ promos, storage, userAgent }).then(({ onClose }) => {
        onClose(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          storage,
          expect.objectContaining({
            blocked: expect.objectContaining({
              campaigns: { 1: { count: 1, timestamp: expect.any(String) } }
            })
          })
        )
      })
    })

    it('updates the blocked groups', () => {
      return placementEngine({ promos, storage, userAgent }).then(({ onClose }) => {
        onClose(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          storage,
          expect.objectContaining({
            blocked: expect.objectContaining({
              groups: { 1: { count: 1, timestamp: expect.any(String) } }
            })
          })
        )
      })
    })

    it('updates the blocked promos', () => {
      return placementEngine({ promos, storage, userAgent }).then(({ onClose }) => {
        onClose(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          storage,
          expect.objectContaining({
            blocked: expect.objectContaining({
              promos: { 1: { count: 1, timestamp: expect.any(String) } }
            })
          })
        )
      })
    })
  })

  describe('onView', () => {
    it('updates the campaign impressions', () => {
      return placementEngine({ promos, storage, userAgent }).then(({ onView }) => {
        onView(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          storage,
          expect.objectContaining({
            impressions: expect.objectContaining({
              campaigns: { 1: { count: 1, timestamp: expect.any(String) } }
            })
          })
        )
      })
    })

    it('updates the group impressions', () => {
      return placementEngine({ promos, storage, userAgent }).then(({ onView }) => {
        onView(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          storage,
          expect.objectContaining({
            impressions: expect.objectContaining({
              groups: { 1: { count: 1, timestamp: expect.any(String) } }
            })
          })
        )
      })
    })

    it('updates the promo impressions', () => {
      return placementEngine({ promos, storage, userAgent }).then(({ onView }) => {
        onView(promos[0])
        expect(set).toHaveBeenLastCalledWith(
          storage,
          expect.objectContaining({
            impressions: expect.objectContaining({
              promos: { 1: { count: 1, timestamp: expect.any(String) } }
            })
          })
        )
      })
    })
  })
})
