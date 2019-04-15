import { get, set } from './userState'

describe('get', () => {
  it("returns the user state if it's in the store", () => {
    const storage = { getItem: jest.fn(() => '{"visits":1}') }
    expect(get(storage)).toEqual({ visits: 1 })
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
    set(storage, { visits: 1 })
    expect(storage.setItem).toHaveBeenCalledWith('user', '{"visits":1}')
  })
})
