## Unreleased

* Bump standard to 14.0.0
* Bump jest to 24.9.0
* Bump babel to 7.5.5

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
