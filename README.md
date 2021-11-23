# Promos Client

![Build status](https://github.com/conversation/promos-client/actions/workflows/test.yml/badge.svg?branch=main)

The promos client provides a placement engine for placing promos into slots on a page.

## How It Works

The placement engine is responsible for filtering promos based on certain rules (e.g. constraints). It returns a promise that resolves to an object with the following shape:

- `promos`: The list of placed promos.
- `onClick`: The callback function that should be called if the user clicks a promo.
- `onClose`: The callback function that should be called if the user dismisses a promo.
- `onView`: The callback function that should be called if the user views a promo.

```js
import { placementEngine } from '@theconversation/promos-client'

const promos = [
  { promoId: 1, groupId: 1, slotId: 1, constraints: '...' },
  { promoId: 2, groupId: 1, slotId: 1, constraints: '...' },
  { promoId: 3, groupId: 2, slotId: 2, constraints: '...' }
]

placementEngine(storage, promos).then(({ promos, onClick, onClose, onView }) => {
  // Render the promos.
})
```

## Constraint Query Language (CQL)

Promos can define constraints using our custom constraint query language (CQL). They are filtered by their constraints when placing the candidate promos. Let's have a look at a few CQL query examples.

Place the promo if the user has visited the site more than three times:

```sql
user.visits > 3
```

Place the promo if the user is on the home page:

```sql
window.location.pathname = "/"
```

Place the promo if the user is viewing the site with the Google Chrome browser:

```sql
browser.name = "Chrome"
```

Place the promo if the user has visited the site more than three times _and_ they have not blocked the current promo:

```sql
(user.visits > 3) AND (promoId NOT IN user.blocked.promos)
```

## Licence

This project is licensed under the MIT licence. See the [LICENCE](https://github.com/conversation/promos-client/blob/master/LICENCE.md) file for more details.
