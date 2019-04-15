import match from './match'

describe('match', () => {
  it('handles number literals', () => {
    expect(match('1')()).toBe(1)
    expect(match('2')()).toBe(2)
  })

  it('handles string literals', () => {
    expect(match('"foo"')()).toBe('foo')
  })

  it('handles variables', () => {
    expect(match('a')({ a: 'foo' })).toEqual('foo')
  })

  describe('handles properties', () => {
    const state = {
      a: { b: { c: 'foo' } },
      d: 'a',
      e: 'b',
      f: 'c'
    }

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

  it('handles equality operators', () => {
    const state = { a: 1, b: 2, c: 3 }

    expect(match('1 = 1')(state)).toBe(true)
    expect(match('1 = 2')(state)).toBe(false)

    expect(match('1 != 1')(state)).toBe(false)
    expect(match('1 != 2')(state)).toBe(true)

    expect(match('"foo" = "foo"')()).toBe(true)
    expect(match('"foo" = "bar"')()).toBe(false)

    expect(match('"foo" != "foo"')()).toBe(false)
    expect(match('"foo" != "bar"')()).toBe(true)
  })

  it('handles comparison operators', () => {
    const state = { a: 1, b: 2, c: 3 }

    expect(match('a < 2')(state)).toBe(true)
    expect(match('b < 1')(state)).toBe(false)
    expect(match('b < 2')(state)).toBe(false)

    expect(match('a <= 2')(state)).toBe(true)
    expect(match('b <= 1')(state)).toBe(false)
    expect(match('b <= 2')(state)).toBe(true)

    expect(match('a > 2')(state)).toBe(false)
    expect(match('b > 1')(state)).toBe(true)
    expect(match('b > 2')(state)).toBe(false)

    expect(match('a >= 2')(state)).toBe(false)
    expect(match('b >= 1')(state)).toBe(true)
    expect(match('b >= 2')(state)).toBe(true)
  })

  it('handles arithmetic operators', () => {
    const state = { a: 1, b: 2, c: 3 }

    expect(match('a + 2')(state)).toBe(3)
    expect(match('a - 2')(state)).toBe(-1)
    expect(match('a * 2')(state)).toBe(2)
    expect(match('a / 2')(state)).toBe(0.5)

    expect(match('1 + 2 * 3')()).toBe(7)
    expect(match('1 + (2 * 3)')()).toBe(7)
    expect(match('(1 + 2) * 3')()).toBe(9)
  })

  it('handles boolean operators', () => {
    const state = { a: true, b: false }

    expect(match('a AND true')(state)).toBe(true)
    expect(match('a AND false')(state)).toBe(false)
    expect(match('b AND true')(state)).toBe(false)
    expect(match('b AND false')(state)).toBe(false)

    expect(match('a OR true')(state)).toBe(true)
    expect(match('a OR false')(state)).toBe(true)
    expect(match('b OR true')(state)).toBe(true)
    expect(match('b OR false')(state)).toBe(false)

    expect(match('NOT true')()).toBe(false)
    expect(match('NOT false')()).toBe(true)
  })

  it('handles regex operators', () => {
    const state = { a: 'foo', b: 'bar' }

    expect(match('a =~ "^f.*$"')(state)).toBe(true)
    expect(match('b =~ "^f.*$"')(state)).toBe(false)

    expect(match('a !~ "^f.*$"')(state)).toBe(false)
    expect(match('b !~ "^f.*$"')(state)).toBe(true)
  })

  it('handles LIKE operator', () => {
    const state = { a: 'foo', b: 'bar' }

    expect(match('a LIKE "fo*"')(state)).toBe(true)
    expect(match('b LIKE "fo*"')(state)).toBe(false)
  })

  describe('handles CONTAINS operator', () => {
    it('with a string', () => {
      const state = { a: 'foo', b: 'bar' }

      expect(match('a CONTAINS "f"')(state)).toBe(true)
      expect(match('b CONTAINS "f"')(state)).toBe(false)
    })

    it('with an array', () => {
      const state = { a: ['foo'], b: ['bar'] }

      expect(match('a CONTAINS "foo"')(state)).toBe(true)
      expect(match('b CONTAINS "foo"')(state)).toBe(false)
    })

    it('with an object', () => {
      const state = { a: { b: 1 } }

      expect(match('a CONTAINS "b"')(state)).toBe(true)
      expect(match('a CONTAINS "c"')(state)).toBe(false)
    })
  })

  it('handles compound expressions', () => {
    const state = { a: 1, b: 2, c: 3 }

    expect(match('a + b + c = 1 + (2 + 3)')(state)).toBe(true)
    expect(match('c - b < c - a')(state)).toBe(true)
  })
})
