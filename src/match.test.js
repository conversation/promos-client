import match from './match'

describe('match', () => {
  const state = {
    a: { b: { c: 'foo' } },
    d: 'a',
    e: 'b',
    f: 'c'
  }

  it('handles number literals', () => {
    expect(match('1')()).toBe(1)
    expect(match('2')()).toBe(2)
  })

  it('handles string literals', () => {
    expect(match('"foo"')()).toBe('foo')
  })

  it('handles variables', () => {
    expect(match('a')(state)).toEqual({ b: { c: 'foo' } })
  })

  describe('handles properties', () => {
    it('with dot notation', () => {
      expect(match('a.b')(state)).toEqual({ c: 'foo' })
      expect(match('a.b.c')(state)).toBe('foo')
    })

    it('with bracket notation', () => {
      expect(match('a["b"]')(state)).toEqual({ c: 'foo' })
      expect(match('a["b"]["c"]')(state)).toBe('foo')

      expect(match('a[e]')(state)).toEqual({ c: 'foo' })
      expect(match('a[e][f]')(state)).toEqual('foo')
    })

    it('with mixed notation', () => {
      expect(match('a.b["c"]')(state)).toBe('foo')
      expect(match('a["b"].c')(state)).toBe('foo')

      expect(match('a.b[f]')(state)).toBe('foo')
      expect(match('a[e].c')(state)).toBe('foo')
    })
  })

  it('handles expression grouping', () => {
    expect(match('(true)')()).toBe(true)
  })

  it('handles equality operators', () => {
    expect(match('1 = 1')()).toBe(true)
    expect(match('1 = 2')()).toBe(false)

    expect(match('1 != 1')()).toBe(false)
    expect(match('1 != 2')()).toBe(true)

    expect(match('"foo" = "foo"')()).toBe(true)
    expect(match('"foo" = "bar"')()).toBe(false)

    expect(match('"foo" != "foo"')()).toBe(false)
    expect(match('"foo" != "bar"')()).toBe(true)
  })

  it('handles comparison operators', () => {
    expect(match('1 < 2')()).toBe(true)
    expect(match('2 < 1')()).toBe(false)
    expect(match('2 < 2')()).toBe(false)

    expect(match('1 <= 2')()).toBe(true)
    expect(match('2 <= 1')()).toBe(false)
    expect(match('2 <= 2')()).toBe(true)

    expect(match('1 > 2')()).toBe(false)
    expect(match('2 > 1')()).toBe(true)
    expect(match('2 > 2')()).toBe(false)

    expect(match('1 >= 2')()).toBe(false)
    expect(match('2 >= 1')()).toBe(true)
    expect(match('2 >= 2')()).toBe(true)
  })

  it('handles arithmetic operators', () => {
    expect(match('1 + 2')()).toBe(3)
    expect(match('1 - 2')()).toBe(-1)
    expect(match('1 * 2')()).toBe(2)
    expect(match('1 / 2')()).toBe(0.5)
  })

  it('handles boolean operators', () => {
    expect(match('true AND true')()).toBe(true)
    expect(match('true AND false')()).toBe(false)
    expect(match('false AND true')()).toBe(false)
    expect(match('false AND false')()).toBe(false)

    expect(match('true OR true')()).toBe(true)
    expect(match('true OR false')()).toBe(true)
    expect(match('false OR true')()).toBe(true)
    expect(match('false OR false')()).toBe(false)

    expect(match('NOT true')()).toBe(false)
    expect(match('NOT false')()).toBe(true)
  })

  it('handles regex operators', () => {
    expect(match('"foo" =~ "^f.*$"')()).toBe(true)
    expect(match('"bar" =~ "^f.*$"')()).toBe(false)

    expect(match('"foo" !~ "^f.*$"')()).toBe(false)
    expect(match('"bar" !~ "^f.*$"')()).toBe(true)
  })

  it('handles LIKE operator', () => {
    expect(match('"foo" LIKE "fo*"')()).toBe(true)
    expect(match('"bar" LIKE "fo*"')()).toBe(false)
  })

  describe('handles CONTAINS operator', () => {
    it('with a string', () => {
      expect(match('"foo" CONTAINS "f"')()).toBe(true)
      expect(match('"bar" CONTAINS "f"')()).toBe(false)
    })

    it('with an array', () => {
      expect(match('["foo"] CONTAINS "foo"')()).toBe(true)
      expect(match('["bar"] CONTAINS "foo"')()).toBe(false)
    })

    it('with an object', () => {
      expect(match('a CONTAINS "b"')(state)).toBe(true)
      expect(match('a CONTAINS "foo"')(state)).toBe(false)
    })
  })
})
