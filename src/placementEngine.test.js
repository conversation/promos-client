import mockStorage from './mockStorage'
import placementEngine from './placementEngine'
import stateMachine from './stateMachine'
import { getUser } from './userState'

jest.mock('./stateMachine', () => jest.fn())
jest.mock('./userState', () => ({ getUser: jest.fn() }))

// Mock the now function.
Date.now = jest.fn(() => 123)

describe('placementEngine', () => {
  const seed = 123
  const user = { visits: 1 }
  const promo = { promoid: 1 }
  const promos = [promo]
  const custom = { foo: 'bar' }

  getUser.mockReturnValue(user)

  const innerMock = jest.fn((state, event, emit) => {
    emit.next({ promos })
    return state
  })

  // The stateMachine function is curried, so we need to return the inner mocked
  // function.
  stateMachine.mockImplementation(() => innerMock)

  it('emits an initial init event to the state machine', done => {
    const storage = mockStorage()

    placementEngine(storage, [], custom)
      .subscribe(state => {
        expect(state.promos).toEqual(promos)
        expect(stateMachine).toHaveBeenLastCalledWith(storage, [], custom)
        expect(innerMock).toHaveBeenLastCalledWith({ seed, user }, { type: 'visit' }, expect.anything())
        done()
      })
  })

  it('handles the onClick/onClose callbacks', done => {
    let onClick, onClose

    placementEngine(mockStorage, [], custom)
      .subscribe(state => {
        onClick = state.onClick
        onClose = state.onClose
      })

    setTimeout(() => {
      onClick(promo)
      expect(innerMock).toHaveBeenLastCalledWith({ seed, user }, { type: 'click', promo }, expect.anything())

      onClose(promo)
      expect(innerMock).toHaveBeenLastCalledWith({ seed, user }, { type: 'close', promo }, expect.anything())

      done()
    }, 0)
  })
})
