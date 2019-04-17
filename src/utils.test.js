import { age, has, like, match, timestamp } from './utils'

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
