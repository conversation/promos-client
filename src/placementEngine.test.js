const userState = require('./userState')
const placementEngine = require('./placementEngine')

jest.mock('./userState', () => ({
  get: jest.fn(),
  set: jest.fn()
}))

jest.mock('./transformer', () => jest.fn(a => a))

describe('placePromos', () => {
  it('calls the callback', done => {
    const callback = jest.fn()

    placementEngine([], window, callback)

    setTimeout(() => {
      expect(callback).toHaveBeenCalled()
      done()
    }, 0)
  })

  it('loads and stores the user state', done => {
    const user = { visits: 1 }
    userState.get.mockReturnValue(user)

    placementEngine([], window, jest.fn())

    setTimeout(() => {
      expect(userState.set).toHaveBeenLastCalledWith(window.localStorage, user)
      done()
    }, 0)
  })
})
