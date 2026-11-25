/** Runs every IoClient operation against the mock organisation. */
import { createMockClient } from '../src/index';

const io = createMockClient({ latencyMs: 0, demoEventAfterMs: 0 });
let failures = 0;
const check = (name: string, ok: boolean) => { if (!ok) failures++; console.log(`${ok ? '✓' : '✗'} ${name}`); };

const me = await io.me();
check('me() is Ana Byrne', me.name === 'Ana Byrne');
const assets = await io.assets.list();
check('assets.list() returns my 6 assets', assets.length === 6);
const open = await io.requests.list({ status: 'open' });
check('open requests include an approval assigned to me', open.items.some(r => r.kind === 'approval'));
const kb = await io.knowledge.search({ q: 'vpn disconnect' });
check('knowledge search ranks the VPN article first', kb.items[0]?.id === 'KB-0112');
const reported = await io.assets.report('as-1', { kind: 'broken', details: 'Trackpad clicks are not registering' });
check('assets.report() opens an incident linked to the asset', reported.kind === 'incident' && reported.assetId === 'as-1');
const commented = await io.requests.comment('rq-2', 'Please deliver to floor 3');
check('commenting on waiting-on-you moves it to in-progress', commented.status === 'in-progress');
const approved = await io.requests.decide('rq-4', 'approve');
check('decide() closes the approval', approved.status === 'closed');
const reopened = await io.requests.reopen('rq-3', 'Camera fails again');
check('reopen() returns a resolved incident to in-progress', reopened.status === 'in-progress' && !reopened.resolvedAt);
let conflict = false;
try { await io.requests.reopen('rq-1', 'x'); } catch (e: any) { conflict = e.status === 409; }
check('reopen() on an open request is rejected (409)', conflict);
const order = await io.requests.create({ kind: 'order', title: 'Ergonomic chair', catalogItemId: 'ct-5', options: { 'Deliver to': 'Home' } });
check('orders needing approval record who approves', order.timeline.some(t => t.text.includes('Kofi Mensah')));
const hits = await io.search('vpn');
check('search() finds requests, assets and articles', ['request', 'asset', 'knowledge'].every(k => hits.some(h => h.kind === k)));
const lost = await io.assets.report('as-3', { kind: 'lost-or-stolen', details: 'Left on the train' });
check('lost-or-stolen locks the asset', (await io.assets.get('as-3')).status === 'lost' && lost.priority === 'high');
let got: string | undefined;
const off = io.events.subscribe(e => { got = e.title; });
await io.requests.create({ kind: 'incident', title: 'Printer jam' });
off();
check('events.subscribe() receives new-request events', !!got?.includes('created'));
const fb = await io.knowledge.feedback('KB-0101', true);
check('knowledge feedback counts', fb.helpful.yes === 389);
const page = await io.requests.list({ limit: 2 });
check('requests paginate with nextCursor', page.items.length === 2 && page.nextCursor === '2');

console.log(failures ? `\n${failures} failed` : '\nall passed');
process.exit(failures ? 1 : 0);
