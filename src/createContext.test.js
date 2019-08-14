import createContext from './createContext'

// Mock the util functions.
jest.mock('./utils', () => ({
  age: jest.fn(),
  scrollPercentX: jest.fn(() => 0.1),
  scrollPercentY: jest.fn(() => 0.2)
}))

describe('createContext', () => {
  it('creates a placement context', () => {
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
    const user = jest.fn()
    const custom = { foo: 'bar' }

    // Stub the user agent.
    Object.defineProperty(window.navigator, 'userAgent', { value: userAgent })

    expect(createContext(user, custom)).toMatchObject({
      browser: { major: '74', name: 'Chrome', version: '74.0.3729.131' },
      device: {},
      os: { name: 'Mac OS', version: '10.14.4' },
      custom: { foo: 'bar' },
      scroll: { percentX: 0.1, percentY: 0.2 },
      user,
      window: expect.anything(),
      age: expect.any(Function),
      lower: expect.any(Function),
      upper: expect.any(Function)
    })
  })
})
