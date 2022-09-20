import mockStorage from './mockStorage'
import placementEngine from './placementEngine'
import stateMachine from './stateMachine'
import { getUser } from './userState'

jest.mock('./stateMachine', () => jest.fn())
jest.mock('./userState', () => ({ getUser: jest.fn() }))

// Mock utils functions.
jest.mock('./utils', () => ({
  seedGenerator: jest.fn(() => jest.fn(() => 123))
}))

describe('placementEngine', () => {
  const seeds = { 2: 123 }
  const user = { visits: 1 }
  const promo = { promoId: 1, groupId: 2 }
  const promos = [promo]

  getUser.mockReturnValue(user)

  const innerMock = jest.fn((state, event) => {
    return { promos, ...state }
  })

  // The stateMachine function is curried, so we need to return the inner mocked
  // function.
  stateMachine.mockImplementation(() => innerMock)

  it('creates a seed for each promo group', done => {
    const storage = mockStorage()

    placementEngine(storage, promos)
      .subscribe(state => {
        expect(innerMock).toHaveBeenLastCalledWith(
          expect.objectContaining({ seeds }),
          expect.anything(),
          expect.anything()
        )
        done()
      })
  })

  it('emits an initial init event to the state machine', done => {
    const storage = mockStorage()

    placementEngine(storage, promos)
      .subscribe(state => {
        expect(state.promos).toEqual(promos)
        expect(stateMachine).toHaveBeenLastCalledWith(storage, promos)
        expect(innerMock).toHaveBeenLastCalledWith(
          { seeds, user, custom: {} },
          { type: 'visit' },
          expect.anything()
        )
        done()
      })
  })

  it('handles the onClick callback', done => {
    const storage = mockStorage()
    let onClick

    placementEngine(storage, promos)
      .subscribe(state => {
        onClick = state.onClick
      })

    setTimeout(() => {
      onClick(promo)
      expect(innerMock).toHaveBeenLastCalledWith(
        expect.anything(),
        { type: 'click', promo },
        expect.anything()
      )
      done()
    }, 0)
  })

  it('handles the onClose callback', done => {
    let onClose

    placementEngine(mockStorage, promos)
      .subscribe(state => {
        onClose = state.onClose
      })

    setTimeout(() => {
      onClose(promo)
      expect(innerMock).toHaveBeenLastCalledWith(
        expect.anything(),
        { type: 'close', promo },
        expect.anything()
      )
      done()
    }, 0)
  })

  it('handles the onView callback', done => {
    let onView

    placementEngine(mockStorage, promos)
      .subscribe(state => {
        onView = state.onView
      })

    setTimeout(() => {
      onView(promo)
      expect(innerMock).toHaveBeenLastCalledWith(
        expect.anything(),
        { type: 'view', promo },
        expect.anything()
      )
      done()
    }, 0)
  })

  it('handles the onRefresh callback', done => {
    let onRefresh

    placementEngine(mockStorage, promos)
      .subscribe(state => {
        onRefresh = state.onRefresh
      })

    setTimeout(() => {
      onRefresh()
      expect(innerMock).toHaveBeenLastCalledWith(
        expect.anything(),
        { type: 'refresh' },
        expect.anything()
      )
      done()
    }, 0)
  })
})
