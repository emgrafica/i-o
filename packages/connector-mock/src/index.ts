import {
  IoError,
  type Asset, type AssetReport, type IoClient, type NewRequest, type OrgEvent, type Page, type Request,
  type RequestQuery, type SearchHit, type TimelineEntry,
} from '@i-o/api';
import { buildDataset, type Dataset } from './data';

export interface MockClientOptions {
  /** Simulated network delay in ms (default 250). Set 0 in tests. */
  latencyMs?: number;
  /** Clock for the sample data (default: now). */
  now?: Date;
  /** Emit a demo event this many ms after the first subscriber (default 20 000; 0 disables). */
  demoEventAfterMs?: number;
}

const clone = <T>(value: T): T => structuredClone(value);
const notFound = (what: string, id: string) => new IoError(`${what} ${id} not found`, 404, 'not_found');
const REPORT_TITLES: Record<AssetReport['kind'], string> = {
  broken: 'Report a problem with',
  'lost-or-stolen': 'Lost or stolen:',
  return: 'Return',
  refresh: 'Replace',
};
const OPEN = new Set(['new', 'in-progress', 'waiting-on-you']);

/**
 * In-browser i-o connector over the "Oakline" sample organisation.
 * State lives in memory for the session; reloading the page resets it.
 */
export function createMockClient(options: MockClientOptions = {}): IoClient & { readonly data: Dataset } {
  const latency = options.latencyMs ?? 250;
  const data = buildDataset(options.now);
  const listeners = new Set<(event: OrgEvent) => void>();
  let demoTimer: ReturnType<typeof setTimeout> | undefined;
  let seq = 1000;

  const delay = <T>(value: T): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(clone(value)), latency));
  const fail = (error: IoError): Promise<never> =>
    new Promise((_, reject) => setTimeout(() => reject(error), latency));
  const nowIso = () => new Date().toISOString();
  const me = () => data.people.find(p => p.id === data.meId)!;
  const ioActor = { name: 'i-o', automated: true };

  function emit(event: OrgEvent) {
    data.events.unshift(event);
    listeners.forEach(listener => listener(clone(event)));
  }

  function findRequest(id: string): Request | undefined {
    return data.requests.find(r => r.id === id || r.number === id);
  }

  function touch(request: Request, entry: Omit<TimelineEntry, 'id' | 'at'>): Request {
    const at = nowIso();
    request.timeline.push({ id: `t${++seq}`, at, ...entry });
    request.updatedAt = at;
    if (entry.status) {
      request.status = entry.status;
      if (entry.status === 'resolved' || entry.status === 'closed') request.resolvedAt = at;
    }
    return request;
  }

  function createRequest(input: NewRequest): Request {
    const id = `rq-${++seq}`;
    const prefix = input.kind === 'order' ? 'ORD' : 'INC';
    const at = nowIso();
    const request: Request = {
      id,
      number: `${prefix}-${60000 + seq}`,
      kind: input.kind,
      title: input.title,
      description: input.description,
      status: 'new',
      priority: input.priority ?? 'normal',
      requestedBy: data.meId,
      requestedFor: input.requestedFor ?? data.meId,
      assetId: input.assetId,
      catalogItemId: input.catalogItemId,
      createdAt: at,
      updatedAt: at,
      timeline: [{ id: `t${++seq}`, at, kind: 'status', author: ioActor, text: input.kind === 'order' ? 'Order placed' : 'Request opened', status: 'new' }],
      attachments: [],
      source: { system: 'mock', id },
    };
    if (input.options && Object.keys(input.options).length) {
      touch(request, { kind: 'system', author: ioActor, text: 'Options: ' + Object.entries(input.options).map(([k, v]) => `${k}: ${v}`).join(', ') });
      request.status = 'new';
    }
    const item = input.catalogItemId ? data.catalog.find(c => c.id === input.catalogItemId) : undefined;
    if (item?.approvalRequired) {
      const manager = data.people.find(p => p.id === me().managerId);
      touch(request, { kind: 'system', author: ioActor, text: `Approval requested from ${manager?.name ?? 'your manager'}` });
      request.status = 'new';
    }
    data.requests.unshift(request);
    emit({ id: `ev-${seq}`, at, kind: 'request', severity: 'info', title: `${request.number} created`, body: request.title, personal: true, source: { system: 'mock', id: request.id } });
    return request;
  }

  const client: IoClient & { readonly data: Dataset } = {
    data,

    me: () => delay(me()),

    people: {
      get: id => {
        const person = data.people.find(p => p.id === id);
        return person ? delay(person) : fail(notFound('Person', id));
      },
      search: q => delay(data.people.filter(p => `${p.name} ${p.email} ${p.title ?? ''}`.toLowerCase().includes(q.toLowerCase()))),
    },

    places: {
      list: () => delay(data.places),
      get: id => {
        const place = data.places.find(p => p.id === id);
        return place ? delay(place) : fail(notFound('Place', id));
      },
    },

    assets: {
      list: (query = {}) => {
        const owner = query.assignedTo ?? data.meId;
        return delay(data.assets.filter((a: Asset) => a.assignedTo === owner && (!query.kind || a.kind === query.kind)));
      },
      get: id => {
        const asset = data.assets.find(a => a.id === id);
        return asset ? delay(asset) : fail(notFound('Asset', id));
      },
      report: (id, report) => {
        const asset = data.assets.find(a => a.id === id);
        if (!asset) return fail(notFound('Asset', id));
        const request = createRequest({
          kind: report.kind === 'refresh' ? 'order' : 'incident',
          title: `${REPORT_TITLES[report.kind]} ${asset.name}`,
          description: report.details,
          priority: report.kind === 'lost-or-stolen' ? 'high' : 'normal',
          assetId: asset.id,
        });
        if (report.kind === 'lost-or-stolen') {
          asset.status = 'lost';
          touch(request, { kind: 'system', author: ioActor, text: `${asset.name} locked and its sign-ins disabled. A replacement can be ordered from this request.` });
        }
        if (report.kind === 'return' || report.kind === 'refresh') {
          touch(request, { kind: 'system', author: ioActor, text: 'A prepaid return label will be emailed to you.' });
        }
        return delay(request);
      },
    },

    requests: {
      list: (query: RequestQuery = {}) => {
        const mine = query.mine ?? true;
        const q = query.q?.toLowerCase();
        let items = data.requests.filter(r =>
          (!mine || r.requestedBy === data.meId || r.requestedFor === data.meId || r.assignee?.id === data.meId)
          && (!query.kind || r.kind === query.kind)
          && (!query.status || (query.status === 'open' ? OPEN.has(r.status) : r.status === query.status))
          && (!q || `${r.number} ${r.title} ${r.description ?? ''}`.toLowerCase().includes(q)));
        items = [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
        const start = Number(query.cursor ?? 0);
        const limit = query.limit ?? 20;
        const page: Page<Request> = { items: items.slice(start, start + limit), total: items.length };
        if (start + limit < items.length) page.nextCursor = String(start + limit);
        return delay(page);
      },
      get: id => {
        const request = findRequest(id);
        return request ? delay(request) : fail(notFound('Request', id));
      },
      create: input => delay(createRequest(input)),
      comment: (id, text) => {
        const request = findRequest(id);
        if (!request) return fail(notFound('Request', id));
        const person = me();
        touch(request, { kind: 'comment', author: { id: person.id, name: person.name }, text });
        if (request.status === 'waiting-on-you') touch(request, { kind: 'status', author: ioActor, text: 'Back with the team', status: 'in-progress' });
        return delay(request);
      },
      reopen: (id, reason) => {
        const request = findRequest(id);
        if (!request) return fail(notFound('Request', id));
        if (request.status !== 'resolved') return fail(new IoError('Only resolved requests can be reopened', 409, 'conflict'));
        const person = me();
        touch(request, { kind: 'comment', author: { id: person.id, name: person.name }, text: reason });
        touch(request, { kind: 'status', author: ioActor, text: 'Reopened', status: 'in-progress' });
        request.resolvedAt = undefined;
        return delay(request);
      },
      cancel: (id, reason) => {
        const request = findRequest(id);
        if (!request) return fail(notFound('Request', id));
        touch(request, { kind: 'status', author: { id: data.meId, name: me().name }, text: reason ? `Cancelled: ${reason}` : 'Cancelled', status: 'cancelled' });
        return delay(request);
      },
      decide: (id, decision, note) => {
        const request = findRequest(id);
        if (!request) return fail(notFound('Request', id));
        if (request.kind !== 'approval' || request.assignee?.id !== data.meId) return fail(new IoError('Not your approval', 403, 'forbidden'));
        touch(request, {
          kind: 'status', author: { id: data.meId, name: me().name },
          text: (decision === 'approve' ? 'Approved' : 'Rejected') + (note ? `: ${note}` : ''),
          status: 'closed',
        });
        return delay(request);
      },
    },

    knowledge: {
      search: (query = {}) => {
        const words = (query.q ?? '').toLowerCase().split(/\s+/).filter(Boolean);
        const scored = data.knowledge
          .filter(a => !query.category || a.category === query.category)
          .map(a => {
            const hay = `${a.title} ${a.summary} ${a.tags.join(' ')}`.toLowerCase();
            const score = words.length ? words.filter(w => hay.includes(w)).length : 1;
            return { a, score };
          })
          .filter(x => x.score > 0)
          .sort((x, y) => y.score - x.score || y.a.views - x.a.views)
          .map(x => x.a);
        const limit = query.limit ?? 20;
        return delay({ items: scored.slice(0, limit), total: scored.length });
      },
      get: id => {
        const article = data.knowledge.find(a => a.id === id);
        if (!article) return fail(notFound('Article', id));
        article.views += 1;
        return delay(article);
      },
      categories: () => delay([...new Set(data.knowledge.map(a => a.category))].sort()),
      feedback: (id, helpful) => {
        const article = data.knowledge.find(a => a.id === id);
        if (!article) return fail(notFound('Article', id));
        article.helpful[helpful ? 'yes' : 'no'] += 1;
        return delay(article);
      },
    },

    catalog: {
      list: (query = {}) => {
        const q = query.q?.toLowerCase();
        return delay(data.catalog.filter(c => (!query.category || c.category === query.category) && (!q || `${c.name} ${c.description}`.toLowerCase().includes(q))));
      },
      get: id => {
        const item = data.catalog.find(c => c.id === id);
        return item ? delay(item) : fail(notFound('Catalog item', id));
      },
      categories: () => delay([...new Set(data.catalog.map(c => c.category))]),
    },

    events: {
      list: (query = {}) => {
        const now = Date.now();
        return delay(data.events.filter(e => !query.active || !e.until || Date.parse(e.until) > now));
      },
      subscribe(listener) {
        listeners.add(listener);
        const after = options.demoEventAfterMs ?? 20_000;
        if (after > 0 && !demoTimer) {
          demoTimer = setTimeout(() => emit({
            id: 'ev-demo', at: nowIso(), kind: 'degradation', severity: 'info',
            title: 'Video calls in Dublin are back to normal',
            body: 'Traffic was rerouted and call quality has recovered.',
            affects: { services: ['Video meetings'], placeIds: ['pl-dub'] },
            source: { system: 'mock', id: 'ev-demo' },
          }), after);
        }
        return () => { listeners.delete(listener); };
      },
    },

    search: q => {
      const s = q.toLowerCase().trim();
      if (!s) return delay([]);
      const hits: SearchHit[] = [
        ...data.requests.filter(r => `${r.number} ${r.title}`.toLowerCase().includes(s)).map(r => ({ kind: 'request' as const, id: r.id, title: r.title, subtitle: r.number })),
        ...data.assets.filter(a => a.assignedTo === data.meId && `${a.name} ${a.serialNumber ?? ''}`.toLowerCase().includes(s)).map(a => ({ kind: 'asset' as const, id: a.id, title: a.name, subtitle: a.serialNumber })),
        ...data.knowledge.filter(a => `${a.title} ${a.tags.join(' ')}`.toLowerCase().includes(s)).map(a => ({ kind: 'knowledge' as const, id: a.id, title: a.title, subtitle: a.category })),
        ...data.catalog.filter(c => c.name.toLowerCase().includes(s)).map(c => ({ kind: 'catalog' as const, id: c.id, title: c.name, subtitle: c.category })),
        ...data.people.filter(p => p.name.toLowerCase().includes(s)).map(p => ({ kind: 'person' as const, id: p.id, title: p.name, subtitle: p.title })),
      ];
      return delay(hits.slice(0, 20));
    },
  };

  return client;
}

export { buildDataset } from './data';
export type { Dataset } from './data';
