import createContext from './createContext'

describe('createContext', () => {
  it('creates a placement context', () => {
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
    const user = jest.fn()

    // Stub the user agent.
    Object.defineProperty(window.navigator, 'userAgent', { value: userAgent })

    expect(createContext(user)).toMatchObject({
      browser: { major: '74', name: 'Chrome', version: '74.0.3729.131' },
      device: {},
      os: { name: 'Mac OS', version: '10.14.4' },
      user,
      window: expect.anything(),
      age: expect.any(Function),
      lower: expect.any(Function),
      upper: expect.any(Function)
    })
  })
})
