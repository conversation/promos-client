import UAParser from 'ua-parser-js'
import toLower from 'fkit/dist/toLower'
import toUpper from 'fkit/dist/toUpper'

import { age } from './utils'

/**
 * Creates a new placement context that contains objects and functions to be
 * made available to the constraint queries.
 *
 * @param {Object} user The user state.
 * @returns {Object} The placement context.
 */
export default function createContext (user) {
  const uaParser = new UAParser(window.navigator.userAgent)

  return {
    // Objects
    browser: uaParser.getBrowser(),
    device: uaParser.getDevice(),
    os: uaParser.getOS(),
    user,
    window,

    // Functions
    age,
    lower: toLower,
    upper: toUpper
  }
}
