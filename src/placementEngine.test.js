import userState from './userState'
import placementEngine from './placementEngine'

jest.mock('./userState', () => ({
  get: jest.fn(),
  set: jest.fn()
}))

jest.mock('./transformer', () => jest.fn(a => a))

describe('placePromos', () => {
  it('calls the callback', done => {
    placementEngine([], window)
      .subscribe(({ placementsMap }) => {
        expect(placementsMap).toEqual({})
        done()
      })
  })

  it('loads and stores the user state', done => {
    const user = { visits: 1 }
    userState.get.mockReturnValue(user)
    placementEngine([], window)
      .subscribe(() => {
        expect(userState.set).toHaveBeenLastCalledWith(window.localStorage, user)
        done()
      })
  })
})
