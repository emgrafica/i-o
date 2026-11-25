# Design archive

Every screen and flow across the imported apps, grouped by what the user is trying to do. This is the starting map for the unified i-o product and for the Figma file. The visual language (colour, type, spacing, components) is defined once in [`packages/design-system/design/design.md`](../packages/design-system/design/design.md).

## Journeys and screens

| Journey | portal | catalog | hub |
|---|---|---|---|
| **Arrive** | Home (hero, shortcuts, announcements, outages), Login, Pilot (preview access), Coming soon, Maintenance, Terms of use | Home, Maintenance, Coming soon, Terms of use | Welcome, Home, Pilot user, What's new |
| **Get help** | Get support (channels, chat, SSO and password reset), Get support search, Assignment issue | Get support, Get support search, Incident creation | Knowledge article detail, Search |
| **Track** | Orders and incidents (list, detail side sheets, comments, attachments, reopen, resolve) | Orders and incidents | Support history, Ticket details |
| **My technology** | Technology (devices, software, accounts), PC refresh, PC return, PC lost or stolen, PC report broken | Technology (including wipe-computer flow) | My devices |
| **Get something new** | n/a | Catalog, Catalog item, Catalog communications, Checkout (multi-step), Confirmation, Approvals | Marketplace, Marketplace devices |
| **Find** | Search | Search | Search |
| **Settings** | User preferences (language, notifications) | User preferences | n/a |
| **Errors** | Page not found, error boundary | Page not found | Invalid page, Unavailable |

## Shared patterns (become design-system components)

| Pattern | Where it appears | Design-system component |
|---|---|---|
| Status card with one primary action | Home, Technology, Orders | `GeneralCard`, `OutageCard`, `OpenIssuesCard`, `SingleIssuesCard` |
| Side sheet with a multi-step flow | PC refresh / return / lost / broken, Wipe computer | `GeneralDialog` + `TimeLine` (to become a dedicated `SideSheet`) |
| Ticket timeline with comments and attachments | Orders and incidents, Ticket details | `TicketDetail`, `Comments`, `AttachmentComponent`, `ReopenComponent`, `ResolvedComponent` |
| Device tile and detail | Technology, My devices, Marketplace | `DeviceCard`, `PcCard`, `MyDevicesDetail`, `UnlistedDevices` |
| Knowledge article with "was this helpful" | Get support, Knowledge detail | `SupportArticle`, `KbDetail`, `KbFlagHelpful`, `RelatedArticle` |
| Global search with type-ahead | All apps | `Search`, `AutoComplete` |
| Top navigation and footer | All apps | `TopNav`, `Footer` |
| Pilot / preview gating | Portal, hub | `PilotMode` |

## Languages

Portal and catalog ship in **12 languages**: en plus de, es, fr, hu, it, ja, ko, pl, pt, ru and zh-Hans (generated). Hub has en and de.

## Imagery

Photography (home hero, coming-soon groups, 404, error) came from the customer projects and is listed in `CUSTOMER_ASSETS.md`. Plan replacements in the i-o style: monochrome UI, so photography or illustration carries any colour.
