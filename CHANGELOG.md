## Unreleased

* Include `types.d.ts` in module distribution (adding its reference to `package.json` `files` field)

## 6.3.0 (2022-06-01)

* Add `donationsLoaded` event handler (https://github.com/conversation/promos-client/pull/46)

## 6.2.0 (2022-05-31)

* Add TypeScript module declaration (`types.d.ts`)

## 6.1.0 (2022-05-18)

* Export the `DEFAULT_USER_STATE` constant (https://github.com/conversation/promos-client/pull/44)

## 6.0.1 (2022-02-14)

* Fix release packaging

## 6.0.0 (2022-02-09)

* Fix esm build so that it works with webpack 5

## 5.5.0 (2021-09-01)

* Replace Replace Bulb with RxJS (https://github.com/conversation/promos-client/pull/34)

## 5.4.0 (2021-08-30)

* Target ES modules (https://github.com/conversation/promos-client/pull/35)

## 5.3.0 (2020-11-26)

* Expose the CQL Parser

## 5.2.0 (2020-11-09)

* Prevent iOS overscrolling (https://github.com/conversation/promos-client/pull/24)

## 5.1.0 (2020-09-08)

* Use default user state if `localStorage` isn't available
* Bump standard to 14.0.0
* Bump jest to 24.9.0
* Bump babel to 7.5.5
* Bump ua-parser-js to 0.7.20

## 5.0.0 (2019-08-22)

* Bump lodash to 4.17.14
* Bump standard to 13.1.0
* Add scroll percent to context
* Add custom state to context
* Add `prng` function to utils
* Add `choose` function to utils
* Refactor to a reactive architecture
* Change `placementEngine` to return a signal, instead of a promise
* Add `seedGenerator` function to utils

## 4.0.0 (2019-05-10)

* Refactor the placement engine to use promises
* Fix bug in `xeqBy` function
* Reorder arguments to `placementEngine` function

## 3.0.0 (2019-04-30)

* Fix an issue where the placement engine was emitting promos for every event

## 2.2.0 (2019-04-29)

* Pass `onClick` function to placement engine subscribers

## 2.1.2 (2019-04-29)

* Refactor reducer to accept a context argument

## 2.1.1 (2019-04-29)

* Fix an issue where the placement engine was initially emitting _all_ promos to subscribers, before filtering them

## 2.1.0 (2019-04-17)

* Add `NOT LIKE` operator
* Refactor parser

## 2.0.0 (2019-04-16)

* Add support for arithmetic operators
* Add support for accessing properties using bracket notation
* Update `CONTAINS` operator to support objects
* Track campaign, group, and promo impressions
* Fix parsing of arithmetic expressions
* Add `IN` operator
* Add `NOT IN` operator
* Remove `CONTAINS` operator
* Add support for function calls
* Add `age` function

## 1.2.0 (2019-04-11)

* Emit promos from the placement engine

## 1.1.1 (2019-04-09)

* Transpile source files

## 1.1.0 (2019-04-08)

* Remove custom `groupBy` function
* Refactor placementEngine to return a signal

## 1.0.0 (2019-03-28)

* Initial release
