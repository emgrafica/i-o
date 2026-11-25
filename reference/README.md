# Reference: the 2021 surfaces

These are the imported 2021 front ends, kept **as design and behaviour reference only**. They aren't built, aren't in the npm workspace, and won't run: they depend on a private third-party component library (not included and not licensed for i-o) and on customer backends that no longer exist.

| Folder | What to take from it |
|---|---|
| `portal-2021` | Screens and flows for home, get support, orders and incidents, device lifecycle (refresh, return, lost or stolen, broken), technology, search and preferences; 12 languages of copy |
| `catalog-2021` | Catalog, item, checkout, confirmation and approvals flows; the GraphQL types in `src/gqlTypes` show which fields the old systems of record exposed |
| `hub-2021` | Marketplace, my devices, knowledge detail, support history and ticket detail |

The new surfaces live in `apps/` and talk only to the i-o API (`packages/api`). As each screen is rebuilt there, its reference copy can be deleted.
