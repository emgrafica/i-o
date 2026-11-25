# @i-o/portal

The first surface of i-o systems: **home, get help, requests and approvals, my technology, catalog and knowledge**, over the i-o API.

```bash
# from the repo root
npm install
npm run dev            # http://localhost:5173
```

By default it runs on the **Oakline sample organisation** (`@i-o/connector-mock`) in the browser, with no server or sign-in needed. To use a real i-o server, set `VITE_IO_API_URL=https://api.i-o.systems` in `apps/portal/.env.local`.

## Screens

| Route | Screen |
|---|---|
| `/` | Home: "Ask i-o", items needing your attention (approvals, replies, device alerts), open requests, service status, my technology, popular help |
| `/help` | Search help articles as you type; open a request linked to a device |
| `/requests`, `/requests/:id` | Open / approvals / closed / all; detail with timeline, comments, approve or reject, reopen, cancel |
| `/technology`, `/technology/:id` | Devices, software and access; report broken, lost or stolen, return, request a replacement |
| `/catalog`, `/catalog/:id` | Browse and order, with options and approval rules |
| `/knowledge/:id` | Article with "was this helpful?" |
| `/search?q=` | One search across requests, devices, help, catalog and people |
| `/preferences` | Profile and language (English, Deutsch) |

Live events (outages, request updates) arrive as banners and toasts through `io.events.subscribe`.
