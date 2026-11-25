import type {
  Asset, CatalogItem, KnowledgeArticle, OrgEvent, Person, Place, Request, SourceRef,
} from '@i-o/api';

/**
 * Sample organisation "Oakline" (fictional). Dates are relative to `now`, so the data
 * always looks current. Nothing here comes from a real customer.
 */
const src = (id: string): SourceRef => ({ system: 'mock', id });
const DAY = 86_400_000;

export interface Dataset {
  meId: string;
  people: Person[];
  places: Place[];
  assets: Asset[];
  requests: Request[];
  knowledge: KnowledgeArticle[];
  catalog: CatalogItem[];
  events: OrgEvent[];
}

export function buildDataset(now: Date = new Date()): Dataset {
  const at = (days: number, hours = 0) => new Date(now.getTime() + days * DAY + hours * 3_600_000).toISOString();

  const places: Place[] = [
    { id: 'pl-dub', name: 'Dublin, Grand Canal', kind: 'site', address: '1 Grand Canal Square, Dublin 2', timeZone: 'Europe/Dublin', source: src('pl-dub') },
    { id: 'pl-dub-3', name: 'Dublin, floor 3', kind: 'floor', parentId: 'pl-dub', source: src('pl-dub-3') },
    { id: 'pl-lon', name: 'London, King\'s Cross', kind: 'site', address: '10 Pancras Square, London N1C', timeZone: 'Europe/London', source: src('pl-lon') },
    { id: 'pl-nyc', name: 'New York, Hudson Yards', kind: 'site', address: '30 Hudson Yards, New York, NY', timeZone: 'America/New_York', source: src('pl-nyc') },
  ];

  const people: Person[] = [
    { id: 'p-ana', name: 'Ana Byrne', email: 'ana.byrne@oakline.example', title: 'Product Designer', department: 'Design', placeId: 'pl-dub-3', managerId: 'p-kofi', language: 'en', source: src('p-ana') },
    { id: 'p-kofi', name: 'Kofi Mensah', email: 'kofi.mensah@oakline.example', title: 'Head of Design', department: 'Design', placeId: 'pl-lon', language: 'en', source: src('p-kofi') },
    { id: 'p-lena', name: 'Lena Fischer', email: 'lena.fischer@oakline.example', title: 'Service Desk Analyst', department: 'Workplace Technology', placeId: 'pl-dub', language: 'de', source: src('p-lena') },
    { id: 'p-raj', name: 'Raj Patel', email: 'raj.patel@oakline.example', title: 'Field Engineer', department: 'Workplace Technology', placeId: 'pl-lon', language: 'en', source: src('p-raj') },
    { id: 'p-mia', name: 'Mia Chen', email: 'mia.chen@oakline.example', title: 'Researcher', department: 'Design', placeId: 'pl-nyc', managerId: 'p-kofi', language: 'en', source: src('p-mia') },
  ];

  const assets: Asset[] = [
    { id: 'as-1', kind: 'laptop', name: 'MacBook Pro 14"', manufacturer: 'Apple', model: 'M3 Pro, 2024', serialNumber: 'C02XK1ZZMD6M', status: 'in-use', assignedTo: 'p-ana', placeId: 'pl-dub-3', acquiredAt: at(-640), warrantyEndsAt: at(20), refreshEligibleAt: at(-5), specs: { Memory: '18 GB', Storage: '512 GB SSD', OS: 'macOS 15' }, source: src('as-1') },
    { id: 'as-2', kind: 'monitor', name: 'Studio Display', manufacturer: 'Apple', model: '27" 5K', serialNumber: 'H4TDP0PGQ6L0', status: 'in-use', assignedTo: 'p-ana', placeId: 'pl-dub-3', acquiredAt: at(-640), warrantyEndsAt: at(85), source: src('as-2') },
    { id: 'as-3', kind: 'phone', name: 'iPhone 15', manufacturer: 'Apple', model: '128 GB', serialNumber: 'F2LXQ9ZRN72J', status: 'in-use', assignedTo: 'p-ana', acquiredAt: at(-300), warrantyEndsAt: at(400), specs: { Number: '+353 87 000 0000', Plan: 'Business unlimited' }, source: src('as-3') },
    { id: 'as-4', kind: 'peripheral', name: 'Magic Keyboard', manufacturer: 'Apple', status: 'in-use', assignedTo: 'p-ana', acquiredAt: at(-640), source: src('as-4') },
    { id: 'as-5', kind: 'software', name: 'Figma Organization', manufacturer: 'Figma', status: 'in-use', assignedTo: 'p-ana', acquiredAt: at(-200), specs: { Licence: 'Full seat', Renews: 'Annually' }, source: src('as-5') },
    { id: 'as-6', kind: 'account', name: 'VPN access', manufacturer: 'Oakline IT', status: 'in-use', assignedTo: 'p-ana', acquiredAt: at(-640), specs: { Profile: 'Standard', MFA: 'Required' }, source: src('as-6') },
    { id: 'as-7', kind: 'laptop', name: 'ThinkPad X1 Carbon', manufacturer: 'Lenovo', model: 'Gen 11', serialNumber: 'PF4ABC12', status: 'in-use', assignedTo: 'p-mia', placeId: 'pl-nyc', acquiredAt: at(-120), warrantyEndsAt: at(975), source: src('as-7') },
  ];

  const me = 'p-ana';
  const agent = { id: 'p-lena', name: 'Lena Fischer', team: 'Service Desk' };
  const field = { id: 'p-raj', name: 'Raj Patel', team: 'Field Services' };
  const io = { name: 'i-o', automated: true };

  const requests: Request[] = [
    {
      id: 'rq-1', number: 'INC-10431', kind: 'incident', title: 'Laptop battery drains in under two hours',
      description: 'Since the last update the battery goes from full to 10% in about 90 minutes, even when idle.',
      status: 'in-progress', priority: 'normal', requestedBy: me, requestedFor: me, assignee: agent, assetId: 'as-1',
      createdAt: at(-3), updatedAt: at(-1), dueAt: at(2),
      timeline: [
        { id: 't1', at: at(-3), kind: 'status', author: io, text: 'Request opened', status: 'new' },
        { id: 't2', at: at(-3, 1), kind: 'system', author: io, text: 'Linked to your MacBook Pro 14" (C02XK1ZZMD6M). Battery health from the last device check-in: 71%.' },
        { id: 't3', at: at(-2), kind: 'status', author: agent, text: 'Assigned to Service Desk', status: 'in-progress' },
        { id: 't4', at: at(-1), kind: 'comment', author: agent, text: 'Battery health is low and the laptop is eligible for refresh. Would you prefer a battery repair (2 days) or a replacement laptop?' },
      ],
      attachments: [{ id: 'at-1', name: 'battery-report.pdf', size: 184_320, contentType: 'application/pdf' }],
      source: src('INC-10431'),
    },
    {
      id: 'rq-2', number: 'ORD-55210', kind: 'order', title: 'Noise-cancelling headset',
      status: 'waiting-on-you', priority: 'low', requestedBy: me, requestedFor: me, assignee: { name: 'Procurement', team: 'Procurement' }, catalogItemId: 'ct-3',
      createdAt: at(-6), updatedAt: at(-2), dueAt: at(5),
      timeline: [
        { id: 't1', at: at(-6), kind: 'status', author: io, text: 'Order placed', status: 'new' },
        { id: 't2', at: at(-5), kind: 'system', author: io, text: 'Approved by Kofi Mensah' },
        { id: 't3', at: at(-2), kind: 'comment', author: { name: 'Procurement', team: 'Procurement' }, text: 'Please confirm the delivery address: Dublin, floor 3, or home?' },
      ],
      attachments: [], source: src('ORD-55210'),
    },
    {
      id: 'rq-3', number: 'INC-10388', kind: 'incident', title: 'Cannot join meetings in room 3.14',
      description: 'The room display shows "No connection" and the camera does not start.',
      status: 'resolved', priority: 'high', requestedBy: me, requestedFor: me, assignee: field,
      createdAt: at(-12), updatedAt: at(-10), resolvedAt: at(-10),
      timeline: [
        { id: 't1', at: at(-12), kind: 'status', author: io, text: 'Request opened', status: 'new' },
        { id: 't2', at: at(-12, 2), kind: 'status', author: field, text: 'On site', status: 'in-progress' },
        { id: 't3', at: at(-10), kind: 'status', author: field, text: 'Replaced the room controller and updated its firmware.', status: 'resolved' },
      ],
      attachments: [], source: src('INC-10388'),
    },
    {
      id: 'rq-4', number: 'APR-2207', kind: 'approval', title: 'Approve: Figma seat for Mia Chen',
      description: 'Mia Chen requested a Figma Organization full seat (€540 per year).',
      status: 'waiting-on-you', priority: 'normal', requestedBy: 'p-mia', requestedFor: 'p-mia', assignee: { id: me, name: 'Ana Byrne' }, catalogItemId: 'ct-7',
      createdAt: at(-1), updatedAt: at(-1),
      timeline: [{ id: 't1', at: at(-1), kind: 'status', author: io, text: 'Approval requested from you as the design tool owner', status: 'waiting-on-you' }],
      attachments: [], source: src('APR-2207'),
    },
    {
      id: 'rq-5', number: 'ORD-55002', kind: 'order', title: 'Ergonomic chair',
      status: 'closed', priority: 'low', requestedBy: me, requestedFor: me, catalogItemId: 'ct-5',
      createdAt: at(-60), updatedAt: at(-48), resolvedAt: at(-48),
      timeline: [
        { id: 't1', at: at(-60), kind: 'status', author: io, text: 'Order placed', status: 'new' },
        { id: 't2', at: at(-48), kind: 'status', author: io, text: 'Delivered to Dublin, floor 3', status: 'closed' },
      ],
      attachments: [], source: src('ORD-55002'),
    },
    {
      id: 'rq-6', number: 'INC-10440', kind: 'incident', title: 'VPN disconnects every few minutes from home',
      status: 'new', priority: 'normal', requestedBy: me, requestedFor: me, assetId: 'as-6',
      createdAt: at(0, -3), updatedAt: at(0, -3),
      timeline: [
        { id: 't1', at: at(0, -3), kind: 'status', author: io, text: 'Request opened', status: 'new' },
        { id: 't2', at: at(0, -2), kind: 'system', author: io, text: 'Found a known issue with the VPN client 5.2 on macOS 15. Suggested fix: update to 5.3 (article KB-0112).' },
      ],
      attachments: [], source: src('INC-10440'),
    },
  ];

  const kb = (id: string, title: string, category: string, summary: string, body: string, tags: string[], views: number, yes: number, no: number, daysAgo: number): KnowledgeArticle => ({
    id, title, category, summary, body, tags, language: 'en', views, helpful: { yes, no }, updatedAt: at(-daysAgo), source: src(id),
  });
  const knowledge: KnowledgeArticle[] = [
    kb('KB-0101', 'Reset your password', 'Accounts and access', 'Change or reset your Oakline password, including when you\'re locked out.', '<p>Go to <strong>account.oakline.example</strong> and choose <em>Forgot password</em>. You\'ll get a code by text or in the authenticator app.</p><ol><li>Enter your work email.</li><li>Enter the code.</li><li>Choose a new password (at least 14 characters).</li></ol><p>Locked out for more than 15 minutes? Open a request and we\'ll unlock you.</p>', ['password', 'sso', 'locked out'], 4210, 388, 21, 30),
    kb('KB-0102', 'Set up multi-factor authentication', 'Accounts and access', 'Register the authenticator app on a new phone.', '<p>Open the authenticator app, tap <strong>Add account → Work</strong>, and scan the code shown at <strong>account.oakline.example/mfa</strong>.</p>', ['mfa', 'authenticator', 'new phone'], 2980, 240, 18, 45),
    kb('KB-0112', 'VPN keeps disconnecting on macOS 15', 'Network and VPN', 'Update the VPN client to 5.3 to fix drop-outs on macOS 15.', '<p>VPN client 5.2 drops the tunnel when macOS 15 changes Wi-Fi power state. Version 5.3 fixes it.</p><ol><li>Open <strong>Self Service</strong>.</li><li>Search for <em>VPN</em> and choose <strong>Update</strong>.</li><li>Restart your Mac.</li></ol>', ['vpn', 'macos', 'disconnect'], 812, 96, 4, 3),
    kb('KB-0120', 'Connect to office Wi-Fi', 'Network and VPN', 'Join "Oakline" Wi-Fi on laptops and phones.', '<p>Choose <strong>Oakline</strong> and sign in with your work account. Guests use <strong>Oakline-Guest</strong> with the code from reception.</p>', ['wifi', 'guest'], 3550, 301, 33, 90),
    kb('KB-0130', 'Book and use a meeting room', 'Workplace', 'Book rooms, start meetings on the room display, and report a problem.', '<p>Book from your calendar: rooms appear as <em>Locations</em>. On arrival, tap <strong>Join</strong> on the room display.</p><p>If the display shows <em>No connection</em>, report it from <strong>i-o → Get help</strong>; the room is detected automatically.</p>', ['meeting room', 'display', 'camera'], 1620, 120, 15, 20),
    kb('KB-0140', 'Improve laptop battery life', 'Devices', 'Check battery health and settings that drain the battery.', '<p>Open <strong>System Settings → Battery → Battery Health</strong>. Below 80% means the battery is worn; open a request for a repair or replacement.</p>', ['battery', 'laptop', 'macbook'], 940, 77, 9, 12),
    kb('KB-0150', 'Return a device when you leave or upgrade', 'Devices', 'How to wipe, pack and return a laptop or phone.', '<p>Start a return from <strong>My technology</strong>. We\'ll email a prepaid label. Sign out of iCloud or your Microsoft account first; i-o wipes the device remotely once it\'s back.</p>', ['return', 'leaver', 'wipe'], 700, 61, 6, 60),
    kb('KB-0160', 'Report a lost or stolen device', 'Devices', 'What to do in the first hour.', '<p>Report it in <strong>My technology</strong> straight away: i-o locks the device and disables its sign-ins. If stolen, also report it to the police and add the reference to your request.</p>', ['lost', 'stolen', 'security'], 455, 58, 2, 40),
    kb('KB-0170', 'Request software', 'Software', 'Find and request apps from the catalog.', '<p>Most apps install from <strong>Self Service</strong> without approval. Paid licences are in <strong>i-o → Catalog → Software</strong> and need your manager\'s approval.</p>', ['software', 'licence', 'install'], 2100, 190, 25, 15),
    kb('KB-0180', 'Print from your laptop', 'Workplace', 'Use follow-me printing on any office printer.', '<p>Print to <strong>Oakline Print</strong>, then tap your badge on any printer to release the job.</p>', ['print', 'printer', 'badge'], 1300, 98, 12, 100),
  ];

  const catalog: CatalogItem[] = [
    { id: 'ct-1', name: 'MacBook Pro 14"', category: 'Laptops', description: 'Standard laptop for design and engineering roles.', price: { amount: 2499, currency: 'EUR' }, approvalRequired: true, leadTimeDays: 5, options: [{ name: 'Memory', values: ['18 GB', '36 GB'] }, { name: 'Keyboard', values: ['UK English', 'US English', 'German', 'French'] }], source: src('ct-1') },
    { id: 'ct-2', name: 'ThinkPad X1 Carbon', category: 'Laptops', description: 'Standard Windows laptop for business roles.', price: { amount: 1899, currency: 'EUR' }, approvalRequired: true, leadTimeDays: 5, options: [{ name: 'Keyboard', values: ['UK English', 'US English', 'German', 'French'] }], source: src('ct-2') },
    { id: 'ct-3', name: 'Noise-cancelling headset', category: 'Accessories', description: 'Wireless headset certified for Teams and Zoom.', price: { amount: 249, currency: 'EUR' }, approvalRequired: false, leadTimeDays: 3, source: src('ct-3') },
    { id: 'ct-4', name: '27" 4K monitor', category: 'Accessories', description: 'USB-C monitor with single-cable charging.', price: { amount: 529, currency: 'EUR' }, approvalRequired: false, leadTimeDays: 4, source: src('ct-4') },
    { id: 'ct-5', name: 'Ergonomic chair', category: 'Workplace', description: 'Fully adjustable chair, delivered to your desk or home.', price: { amount: 690, currency: 'EUR' }, approvalRequired: true, leadTimeDays: 10, options: [{ name: 'Deliver to', values: ['Office desk', 'Home'] }], source: src('ct-5') },
    { id: 'ct-6', name: 'Mobile phone', category: 'Phones', description: 'iPhone or Android with a business plan.', price: { amount: 799, currency: 'EUR' }, approvalRequired: true, leadTimeDays: 5, options: [{ name: 'Model', values: ['iPhone 15', 'Pixel 9'] }], source: src('ct-6') },
    { id: 'ct-7', name: 'Figma Organization seat', category: 'Software', description: 'Full design seat. Annual licence.', price: { amount: 540, currency: 'EUR' }, approvalRequired: true, leadTimeDays: 1, source: src('ct-7') },
    { id: 'ct-8', name: 'Adobe Creative Cloud', category: 'Software', description: 'All apps. Annual licence.', price: { amount: 900, currency: 'EUR' }, approvalRequired: true, leadTimeDays: 1, source: src('ct-8') },
    { id: 'ct-9', name: 'Guest Wi-Fi for an event', category: 'Workplace', description: 'Event network with a custom code for up to 200 guests.', approvalRequired: false, leadTimeDays: 2, source: src('ct-9') },
  ];

  const events: OrgEvent[] = [
    { id: 'ev-1', at: at(0, -1), kind: 'degradation', severity: 'warning', title: 'Video calls are slow in Dublin', body: 'Some meetings from Dublin have choppy video. Network engineers are rerouting traffic; next update in 30 minutes.', affects: { services: ['Video meetings'], placeIds: ['pl-dub'] }, until: at(0, 2), source: src('ev-1') },
    { id: 'ev-2', at: at(2), kind: 'maintenance', severity: 'info', title: 'Email maintenance on Saturday', body: 'Email may be unavailable for up to 15 minutes between 06:00 and 07:00 (Dublin time).', affects: { services: ['Email'] }, until: at(2, 1), source: src('ev-2') },
    { id: 'ev-3', at: at(-1), kind: 'announcement', severity: 'info', title: 'New: ask i-o in your own words', body: 'Describe what you need ("my laptop is slow", "order a monitor") and i-o finds the fastest way to sort it.', source: src('ev-3') },
    { id: 'ev-4', at: at(0, -6), kind: 'asset', severity: 'warning', title: 'Your laptop\'s warranty ends in 20 days', body: 'Your MacBook Pro 14" is also eligible for refresh. Request a replacement before the warranty ends.', affects: { assetIds: ['as-1'] }, personal: true, source: src('ev-4') },
  ];

  return { meId: me, people, places, assets, requests, knowledge, catalog, events };
}
