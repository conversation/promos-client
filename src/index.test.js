import { placementEngine, CQLParser, DEFAULT_USER_STATE } from '.'

describe('index', () => {
  it('exports placementEngine', () => {
    expect(typeof placementEngine).toEqual('function')
  })

  it('exports CQLParser', () => {
    expect(typeof CQLParser.parse).toEqual('function')
  })

  it('exports DEFAULT_USER_STATE', () => {
    expect(DEFAULT_USER_STATE.visits).toEqual(0)
  })
})
