/**
 * Creates a mock storage object for use in testing.
 *
 * @params {Object} state The initial state of the store.
 * @returns {Storage} The storage object.
 */
export default function mockStorage (state = {}) {
  return {
    getItem (k) { return JSON.stringify(state[k] || null) },
    setItem (k, v) { state[k] = JSON.parse(v) },
    clear () { state = {} },
    get state () { return state },
    set state (s) { state = s }
  }
}
