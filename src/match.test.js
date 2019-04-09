import match from './match'

describe('match', () => {
  it('handles variables', () => {
    const p = match('a = 1')
    expect(p({ a: 1 })).toBe(true)
    expect(p({ a: 2 })).toBe(false)
  })

  it('handles properties', () => {
    const p = match('a.b = 1')
    expect(p({ a: { b: 1 } })).toBe(true)
    expect(p({ a: { b: 2 } })).toBe(false)
  })

  it('handles expression grouping', () => {
    expect(match('(true)')()).toBe(true)
  })

  it('handles equality operators', () => {
    expect(match('1 = 1')()).toBe(true)
    expect(match('1 = 2')()).toBe(false)

    expect(match('1 != 1')()).toBe(false)
    expect(match('1 != 2')()).toBe(true)
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

  it('handles CONTAINS operator', () => {
    expect(match('"foo" CONTAINS "f"')()).toBe(true)
    expect(match('"bar" CONTAINS "f"')()).toBe(false)

    expect(match('["foo"] CONTAINS "foo"')()).toBe(true)
    expect(match('["bar"] CONTAINS "foo"')()).toBe(false)
  })
})
