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

    placementEngine(storage, [])
      .subscribe(state => {
        expect(state.promos).toEqual(promos)
        expect(stateMachine).toHaveBeenLastCalledWith(storage, [], {})
        expect(innerMock).toHaveBeenLastCalledWith({ seed, user }, { type: 'visit' }, expect.anything())
        done()
      })
  })

  it('handles the onClick callback', done => {
    let onClick

    placementEngine(mockStorage, [])
      .subscribe(state => {
        onClick = state.onClick
      })

    setTimeout(() => {
      onClick(promo)
      expect(innerMock).toHaveBeenLastCalledWith({ seed, user }, { type: 'click', promo }, expect.anything())
      done()
    }, 0)
  })

  it('handles the onClose callback', done => {
    let onClose

    placementEngine(mockStorage, [])
      .subscribe(state => {
        onClose = state.onClose
      })

    setTimeout(() => {
      onClose(promo)
      expect(innerMock).toHaveBeenLastCalledWith({ seed, user }, { type: 'close', promo }, expect.anything())
      done()
    }, 0)
  })

  it('handles the onView callback', done => {
    let onView

    placementEngine(mockStorage, [])
      .subscribe(state => {
        onView = state.onView
      })

    setTimeout(() => {
      onView(promo)
      expect(innerMock).toHaveBeenLastCalledWith({ seed, user }, { type: 'view', promo }, expect.anything())
      done()
    }, 0)
  })

  it('handles the onRefresh callback', done => {
    let onRefresh

    placementEngine(mockStorage, [])
      .subscribe(state => {
        onRefresh = state.onRefresh
      })

    setTimeout(() => {
      onRefresh()
      expect(innerMock).toHaveBeenLastCalledWith({ seed, user }, { type: 'refresh' }, expect.anything())
      done()
    }, 0)
  })
})
