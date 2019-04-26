import { get, set } from './userState'
import placementEngine from './placementEngine'
import reducer from './reducer'

jest.mock('./userState', () => ({
  get: jest.fn(),
  set: jest.fn()
}))

jest.mock('./reducer', () => jest.fn((promos, window, state, event) => state))

describe('placementEngine', () => {
  const user = { visits: 1 }

  get.mockReturnValue(user)

  it('initially calls the callback with an empty array', done => {
    const promos = [{ promoid: 1 }]
    placementEngine(promos, window)
      .subscribe(({ promos }) => {
        expect(promos).toEqual([])
        done()
      })
  })

  it('loads and stores the user state', done => {
    placementEngine([], window)
      .subscribe(() => {
        expect(set).toHaveBeenLastCalledWith(window.localStorage, user)
        done()
      })
  })

  it('handles the onClick and onClose callbacks', done => {
    const promo = { promoid: 1 }
    let onClick, onClose

    placementEngine([], window)
      .subscribe(state => {
        onClick = state.onClick
        onClose = state.onClose
      })

    setTimeout(() => {
      expect(reducer).toHaveBeenLastCalledWith([], window, { promos: [], user }, { type: 'visit' })
      onClick(promo)
      expect(reducer).toHaveBeenLastCalledWith([], window, { promos: [], user }, { type: 'click', promo })
      onClose(promo)
      expect(reducer).toHaveBeenLastCalledWith([], window, { promos: [], user }, { type: 'close', promo })
      done()
    }, 0)
  })
})
