const match = require('./match')

describe('match', () => {
  const query = 'count > 42 AND (user = "bob" OR user = "alice")'
  const matcher = match(query)

  it('returns true if the query matches the values', () => {
    expect(matcher({ count: 43, user: 'bob' })).toBe(true)
  })

  it('returns false if the query does not match the values', () => {
    expect(matcher({ count: 42, user: 'alice' })).toBe(false)
  })
})
