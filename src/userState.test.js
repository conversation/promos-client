import { getUser, setUser, updateUser } from './userState'

const user = { visits: 1 }

describe('getUser', () => {
  it("returns the user state if it's in the store", () => {
    const storage = { getItem: jest.fn(() => '{"visits":1}') }
    expect(getUser(storage)).toEqual(user)
  })

  it("returns the default user state if it's not in the store", () => {
    const storage = { getItem: jest.fn(() => null) }
    expect(getUser(storage)).toEqual({
      blocked: {},
      impressions: {},
      visits: 0
    })
  })
})

describe('setUser', () => {
  it('adds the user state to the store', () => {
    const storage = { setItem: jest.fn() }
    const user = { visits: 1 }
    expect(setUser(storage, user)).toEqual({ visits: 1 })
    expect(storage.setItem).toHaveBeenCalledWith('user', '{"visits":1}')
  })
})

describe('updateUser', () => {
  it('updates the user state in the store', () => {
    const storage = { setItem: jest.fn() }
    const user = { visits: 1 }
    const f = () => ({ visits: 2 })
    expect(updateUser(storage, f, user)).toEqual({ visits: 2 })
    expect(storage.setItem).toHaveBeenCalledWith('user', '{"visits":2}')
  })
})
