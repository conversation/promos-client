import id from 'fkit/dist/id'

import runQuery from './runQuery'

describe('runQuery', () => {
  it('handles number literals', () => {
    expect(runQuery('1')).toBe(1)
    expect(runQuery('2')).toBe(2)
  })

  it('handles string literals', () => {
    expect(runQuery('"foo"')).toBe('foo')
    expect(runQuery('"bar"')).toBe('bar')
  })

  it('handles array literals', () => {
    const context = { a: 'foo', b: 'bar' }

    expect(runQuery('[1, 2]')).toEqual([1, 2])
    expect(runQuery('["foo", "bar"]')).toEqual(['foo', 'bar'])
    expect(runQuery('[a, b]', context)).toEqual(['foo', 'bar'])
  })

  it('handles variables', () => {
    const context = { a: 'foo' }

    expect(runQuery('a', context)).toEqual('foo')
  })

  describe('handles properties', () => {
    const context = {
      a: { b: { c: 'foo' } },
      d: 'a',
      e: 'b',
      f: 'c'
    }

    it('with dot notation', () => {
      expect(runQuery('a.b', context)).toEqual({ c: 'foo' })
      expect(runQuery('a.b.c', context)).toBe('foo')
    })

    it('with bracket notation', () => {
      expect(runQuery('a["b"]', context)).toEqual({ c: 'foo' })
      expect(runQuery('a["b"]["c"]', context)).toBe('foo')

      expect(runQuery('a[e]', context)).toEqual({ c: 'foo' })
      expect(runQuery('a[e][f]', context)).toEqual('foo')
    })

    it('with mixed notation', () => {
      expect(runQuery('a.b["c"]', context)).toBe('foo')
      expect(runQuery('a["b"].c', context)).toBe('foo')

      expect(runQuery('a.b[f]', context)).toBe('foo')
      expect(runQuery('a[e].c', context)).toBe('foo')
    })
  })

  it('handles function calls', () => {
    const context = { a: jest.fn(id) }
    expect(runQuery('a("foo")', context)).toEqual('foo')
    expect(context.a).toHaveBeenLastCalledWith('foo')
  })

  it('handles equality operator', () => {
    const context = { a: 1, b: 2 }

    expect(runQuery('1 = 1')).toBe(true)
    expect(runQuery('2 = 1')).toBe(false)

    expect(runQuery('"foo" = "foo"')).toBe(true)
    expect(runQuery('"bar" = "foo"')).toBe(false)

    expect(runQuery('a = 1', context)).toBe(true)
    expect(runQuery('b = 1', context)).toBe(false)
  })

  it('handles inequality operator', () => {
    const context = { a: 1, b: 2 }

    expect(runQuery('1 != 1')).toBe(false)
    expect(runQuery('2 != 1')).toBe(true)

    expect(runQuery('"foo" != "foo"')).toBe(false)
    expect(runQuery('"bar" != "foo"')).toBe(true)

    expect(runQuery('a != 1', context)).toBe(false)
    expect(runQuery('b != 1', context)).toBe(true)
  })

  it('handles comparison operators', () => {
    const context = { a: 1, b: 2 }

    expect(runQuery('a < 2', context)).toBe(true)
    expect(runQuery('b < 1', context)).toBe(false)
    expect(runQuery('b < 2', context)).toBe(false)

    expect(runQuery('a <= 2', context)).toBe(true)
    expect(runQuery('b <= 1', context)).toBe(false)
    expect(runQuery('b <= 2', context)).toBe(true)

    expect(runQuery('a > 2', context)).toBe(false)
    expect(runQuery('b > 1', context)).toBe(true)
    expect(runQuery('b > 2', context)).toBe(false)

    expect(runQuery('a >= 2', context)).toBe(false)
    expect(runQuery('b >= 1', context)).toBe(true)
    expect(runQuery('b >= 2', context)).toBe(true)
  })

  it('handles arithmetic operators', () => {
    const context = { a: 1, b: 2 }

    expect(runQuery('a + 2', context)).toBe(3)
    expect(runQuery('a - 2', context)).toBe(-1)
    expect(runQuery('a * 2', context)).toBe(2)
    expect(runQuery('a / 2', context)).toBe(0.5)

    expect(runQuery('1 + 2 * 3')).toBe(7)
    expect(runQuery('1 + (2 * 3)')).toBe(7)
    expect(runQuery('(1 + 2) * 3')).toBe(9)
  })

  it('handles boolean operators', () => {
    const context = { a: true, b: false }

    expect(runQuery('a AND true', context)).toBe(true)
    expect(runQuery('a AND false', context)).toBe(false)
    expect(runQuery('b AND true', context)).toBe(false)
    expect(runQuery('b AND false', context)).toBe(false)

    expect(runQuery('a OR true', context)).toBe(true)
    expect(runQuery('a OR false', context)).toBe(true)
    expect(runQuery('b OR true', context)).toBe(true)
    expect(runQuery('b OR false', context)).toBe(false)

    expect(runQuery('NOT true')).toBe(false)
    expect(runQuery('NOT false')).toBe(true)
  })

  it('handles regex operators', () => {
    const context = { a: 'foo', b: 'bar' }

    expect(runQuery('"foo" =~ "^\\w.*$"')).toBe(true)
    expect(runQuery('"bar" =~ "^[f].*$"')).toBe(false)

    expect(runQuery('a =~ "^f.*$"', context)).toBe(true)
    expect(runQuery('b =~ "^f.*$"', context)).toBe(false)

    expect(runQuery('a !~ "^f.*$"', context)).toBe(false)
    expect(runQuery('b !~ "^f.*$"', context)).toBe(true)
  })

  it('handles LIKE operator', () => {
    const context = { a: 'foo', b: 'bar' }

    expect(runQuery('a LIKE "fo%"', context)).toBe(true)
    expect(runQuery('b LIKE "fo%"', context)).toBe(false)
  })

  describe('handles IN operator', () => {
    it('with an string literal', () => {
      expect(runQuery('"foo" IN "foo"')).toBe(true)
      expect(runQuery('"foo" IN "bar"')).toBe(false)
    })

    it('with an array literal', () => {
      expect(runQuery('"foo" IN ["foo"]')).toBe(true)
      expect(runQuery('"foo" IN []')).toBe(false)
    })

    it('with an array variable', () => {
      const context = { a: ['foo'], b: ['bar'] }

      expect(runQuery('"foo" IN a', context)).toBe(true)
      expect(runQuery('"foo" IN b', context)).toBe(false)
    })

    it('with an object variable', () => {
      const context = { a: { b: 1 } }

      expect(runQuery('"b" IN a', context)).toBe(true)
      expect(runQuery('"c" IN a', context)).toBe(false)
    })
  })

  describe('handles NOT IN operator', () => {
    it('with an array literal', () => {
      expect(runQuery('"foo" NOT IN ["foo"]')).toBe(false)
      expect(runQuery('"foo" NOT IN []')).toBe(true)
    })

    it('with an array variable', () => {
      const context = { a: ['foo'], b: ['bar'] }

      expect(runQuery('"foo" NOT IN a', context)).toBe(false)
      expect(runQuery('"foo" NOT IN b', context)).toBe(true)
    })

    it('with an object variable', () => {
      const context = { a: { b: 1 } }

      expect(runQuery('"b" NOT IN a', context)).toBe(false)
      expect(runQuery('"c" NOT IN a', context)).toBe(true)
    })
  })

  it('handles compound expressions', () => {
    const context = { a: 1, b: 2, c: 3 }

    expect(runQuery('a + b + c = 1 + (2 + 3)', context)).toBe(true)
    expect(runQuery('c - b < c - a', context)).toBe(true)
  })
})
