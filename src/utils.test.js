import { age, timestamp } from './utils'

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
