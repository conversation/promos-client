import { get, set } from './userState'

const user = { visits: 1 }

describe('get', () => {
  it("returns the user state if it's in the store", () => {
    const storage = { getItem: jest.fn(() => '{"visits":1}') }
    expect(get(storage)).toEqual(user)
  })

  it("returns the default user state if it's not in the store", () => {
    const storage = { getItem: jest.fn(() => null) }
    expect(get(storage)).toEqual({
      blocked: {},
      impressions: {},
      visits: 0
    })
  })
})

describe('set', () => {
  it('adds the user state to the store', () => {
    const storage = { setItem: jest.fn() }
    const user = { visits: 1 }
    expect(set(storage, user)).toBe(user)
    expect(storage.setItem).toHaveBeenCalledWith('user', '{"visits":1}')
  })
})
