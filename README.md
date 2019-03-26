# Promos Client

The promos client provides a placement engine for placing promos into slots on a page.

## How It Works

The placement engine is responsible for placing promos into slots. It does this by filtering the candidate promos by their constraints, as well as a few other simple rules for how they can be placed together.

```js
import promosClient from '@theconversation/promos-client'

const promos = [
  { id: 1, groupId: 1, slotId: 1, constraints: '...' },
  { id: 2, groupId: 1, slotId: 1, constraints: '...' },
  { id: 3, groupId: 2, slotId: 2, constraints: '...' }
]

/**
 * The callback function is called by the placement engine when the placements
 * are updated.
 *
 * `placementsMap` is a map from slot IDs to promos. It is up to the app to
 * render the promos into slots.
 *
 * `onClose` is a callback function that should be called by the app if the
 * user dismisses a promo (e.g. popup).
 */
const callback = (placementsMap, onClose) => { ... }

promosClient.placementEngine(promos, window, callback)
```

## Constraint Queries

Promos can define constraint queries that are used by the placement engine when filtering the candidate promos. Here are some examples of promo constrain queries.

Show the promo if the user has visited the site more than three times:

    user.visits > 3

Show the promo if the user is on the home page:

    window.location.pathname = "/"

Show the promo if the user is viewing the site in the Google Chrome browser:

    window.navigator.userAgent =~ "Chrome"

Show the promo if the user has visited the site more than three times _and_ they have not blocked the current promo:

    user.visits > 3 AND (NOT user.blocked CONTAINS promo.id)

## Licence

This project is licensed under the MIT licence. See the [LICENCE](https://github.com/conversation/promos-client/blob/master/LICENCE.md) file for more details.

The [parser definition](https://github.com/conversation/promos-client/blob/master/src/parser.jison) is derived from the Adzerk [zerkel](https://github.com/adzerk/zerkel) query language, which is licensed under the Apache 2.0 licence.
