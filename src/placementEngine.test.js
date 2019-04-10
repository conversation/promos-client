import { get, set } from './userState'
import placementEngine from './placementEngine'

jest.mock('./userState', () => ({
  get: jest.fn(),
  set: jest.fn()
}))

jest.mock('./transformer', () => jest.fn(a => a))

describe('placePromos', () => {
  it('calls the callback', done => {
    placementEngine([], window)
      .subscribe(({ promos }) => {
        expect(promos).toEqual([])
        done()
      })
  })

  it('loads and stores the user state', done => {
    const user = { visits: 1 }
    get.mockReturnValue(user)
    placementEngine([], window)
      .subscribe(() => {
        expect(set).toHaveBeenLastCalledWith(window.localStorage, user)
        done()
      })
  })
})
