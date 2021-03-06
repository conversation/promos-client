import id from 'fkit/dist/id'

import { age, choose, has, like, match, prng, scrollPercentX, scrollPercentY, seedGenerator, timestamp, xeqBy } from './utils'

describe('timestamp', () => {
  it('returns the ISO8601 timestamp', () => {
    expect(timestamp()).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/)
  })
})

describe('age', () => {
  it('returns the ISO8601 timestamp', () => {
    const spy = jest.spyOn(Date, 'now').mockImplementation(() => 1555394270536)
    const result = age('2019-04-16T05:07:10.268Z')
    expect(result).toBe(3040)
    spy.mockRestore()
  })
})

describe('match', () => {
  const value = 'foo bar'

  it('returns true if the string matches the regex', () => {
    expect(match(value, '^foo.*$')).toBe(true)
    expect(match(value, '^.*bar$')).toBe(true)
  })

  it('returns false otherwise', () => {
    expect(match(value, 'baz')).toBe(false)
  })
})

describe('like', () => {
  const value = 'foo bar'

  it('returns true if the string matches the regex', () => {
    expect(like(value, '%')).toBe(true)
    expect(like(value, 'foo%')).toBe(true)
    expect(like(value, '%bar')).toBe(true)
  })

  it('returns false otherwise', () => {
    expect(like(value, 'baz')).toBe(false)
  })
})

describe('has', () => {
  describe('with a string', () => {
    const value = 'foo bar'

    it('returns true if the value contains the target', () => {
      expect(has(value, 'foo')).toBe(true)
      expect(has(value, 'bar')).toBe(true)
    })

    it('returns false otherwise', () => {
      expect(has(value, 'baz')).toBe(false)
    })
  })

  describe('with an array', () => {
    const value = ['foo', 'bar']

    it('returns true if the value contains the target', () => {
      expect(has(value, 'foo')).toBe(true)
      expect(has(value, 'bar')).toBe(true)
    })

    it('returns false otherwise', () => {
      expect(has(value, 'baz')).toBe(false)
    })
  })

  describe('with an object', () => {
    const value = { a: 'foo', b: 'bar' }

    it('returns true if the value contains the target', () => {
      expect(has(value, 'a')).toBe(true)
      expect(has(value, 'b')).toBe(true)
    })

    it('returns false otherwise', () => {
      expect(has(value, 'c')).toBe(false)
    })
  })
})

describe('xeqBy', () => {
  it('returns true if the values are equal', () => {
    expect(xeqBy(id)(1, 1)).toBe(true)
    expect(xeqBy(id)(1, 1)).toBe(true)
  })

  it('returns false otherwise', () => {
    expect(xeqBy(id)(1, 2)).toBe(false)
    expect(xeqBy(id)(2, 1)).toBe(false)

    expect(xeqBy(id)(1, null)).toBe(false)
    expect(xeqBy(id)(null, 1)).toBe(false)
    expect(xeqBy(id)(null, null)).toBe(false)

    expect(xeqBy(id)(1, undefined)).toBe(false)
    expect(xeqBy(id)(undefined, 1)).toBe(false)
    expect(xeqBy(id)(undefined, undefined)).toBe(false)
  })
})

describe('scrollPercentX', () => {
  Object.defineProperties(document.documentElement, {
    scrollLeft: { value: 50 },
    scrollWidth: { value: 200 },
    clientWidth: { value: 100 }
  })

  it('returns the horizontal scroll percentage', () => {
    expect(scrollPercentX()).toBe(0.5)
  })
})

describe('scrollPercentY', () => {
  describe('scrollTop is half way through the document', () => {
    it('returns 0.5', () => {
      Object.defineProperties(document.documentElement, {
        scrollTop: { value: 50, configurable: true },
        scrollHeight: { value: 200, configurable: true },
        clientHeight: { value: 100, configurable: true }
      })

      expect(scrollPercentY()).toBe(0.5)
    })
  })

  // Webkit/iOS can return scroll values less than zero
  describe('scrollTop has a negative value', () => {
    it('clamps the return value to 0', () => {
      Object.defineProperties(document.documentElement, {
        scrollTop: { value: -5, configurable: true },
        scrollHeight: { value: 200, configurable: true },
        clientHeight: { value: 100, configurable: true }
      })

      expect(scrollPercentY()).toBe(0)
    })
  })

  // Webkit/iOS can return scroll values greater than the
  // total height of the document
  describe('scrollTop exceeds the height of the document', () => {
    it('clamps the return value to 1', () => {
      Object.defineProperties(document.documentElement, {
        scrollTop: { value: 105, configurable: true },
        scrollHeight: { value: 200, configurable: true },
        clientHeight: { value: 100, configurable: true }
      })

      expect(scrollPercentY()).toBe(1)
    })
  })

  describe('scrollTop is zero', () => {
    it('returns 0', () => {
      Object.defineProperties(document.documentElement, {
        scrollTop: { value: 0, configurable: true },
        scrollHeight: { value: 200, configurable: true },
        clientHeight: { value: 100, configurable: true }
      })

      expect(scrollPercentY()).toBe(0)
    })
  })

  describe('scrollTop is half way when scrollHeight equals clientHeight', () => {
    it('returns 1', () => {
      Object.defineProperties(document.documentElement, {
        scrollTop: { value: 50, configurable: true },
        scrollHeight: { value: 100, configurable: true },
        clientHeight: { value: 100, configurable: true }
      })

      expect(scrollPercentY()).toBe(1.0)
    })
  })
})

describe('seedGenerator', () => {
  it('returns a pseudorandom number generator function', () => {
    const spy = jest.spyOn(Date, 'now').mockImplementation(() => 1555394270536)
    const seed = seedGenerator()
    expect(seed()).toBe(4114112711)
    expect(seed()).toBe(3060312162)
    expect(seed()).toBe(3758452996)
    spy.mockRestore()
  })
})

describe('prng', () => {
  it('returns a pseudorandom number generator function', () => {
    const rand = prng(0)
    expect(rand()).toBe(0.26642920868471265)
    expect(rand()).toBe(0.0003297457005828619)
    expect(rand()).toBe(0.2232720274478197)
  })
})

describe('choose', () => {
  it('returns a random element from the array', () => {
    expect(choose(() => 0.1, [0, 1, 2])).toBe(0)
    expect(choose(() => 0.5, [0, 1, 2])).toBe(1)
    expect(choose(() => 0.9, [0, 1, 2])).toBe(2)
  })
})
