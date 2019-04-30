import placementEngine from './placementEngine'
import stateMachine from './stateMachine'
import { get } from './userState'

jest.mock('./stateMachine', () => jest.fn())
jest.mock('./userState', () => ({ get: jest.fn() }))

describe('placementEngine', () => {
  const user = { visits: 1 }
  const promo = { promoid: 1 }
  const promos = [promo]

  get.mockReturnValue(user)

  const innerMock = jest.fn((state, event, emit) => {
    emit.next({ promos })
    return state
  })

  // The stateMachine function is curried, so we need to return the inner mocked
  // function.
  stateMachine.mockImplementation(() => innerMock)

  it('emits an initial init event to the state machine', done => {
    placementEngine([], window)
      .subscribe(state => {
        expect(state.promos).toEqual(promos)
        expect(stateMachine).toHaveBeenLastCalledWith([], window)
        expect(innerMock).toHaveBeenLastCalledWith({ user }, { type: 'visit' }, expect.anything())
        done()
      })
  })

  it('handles the onClick/onClose callbacks', done => {
    let onClick, onClose

    placementEngine([], window)
      .subscribe(state => {
        onClick = state.onClick
        onClose = state.onClose
      })

    setTimeout(() => {
      onClick(promo)
      expect(innerMock).toHaveBeenLastCalledWith({ user }, { type: 'click', promo }, expect.anything())

      onClose(promo)
      expect(innerMock).toHaveBeenLastCalledWith({ user }, { type: 'close', promo }, expect.anything())

      done()
    }, 0)
  })
})
