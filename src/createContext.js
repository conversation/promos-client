import UAParser from 'ua-parser-js'
import curry from 'fkit/dist/curry'
import toLower from 'fkit/dist/toLower'
import toUpper from 'fkit/dist/toUpper'

import { age, scrollPercentX, scrollPercentY } from './utils'

/**
 * Creates a new placement context that contains objects and functions to be
 * made available to the constraint queries.
 *
 * @param {Object} user The user state object.
 * @param {Object} custom The custom state object.
 * @returns {Object} The placement context.
 */
function createContext (user, custom) {
  const uaParser = new UAParser(window.navigator.userAgent)
  const scroll = {
    percentX: scrollPercentX(),
    percentY: scrollPercentY()
  }

  return {
    // browser
    browser: uaParser.getBrowser(),
    device: uaParser.getDevice(),
    os: uaParser.getOS(),

    // objects
    custom,
    scroll,
    user,
    window,

    // utility functions
    age,
    lower: toLower,
    upper: toUpper
  }
}

export default curry(createContext)
