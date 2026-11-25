import { IoClient, IoError } from './client';
import type { Asset, OrgEvent } from './types';

export interface HttpClientOptions {
  /** i-o server base URL, e.g. "https://api.i-o.systems". */
  baseUrl: string;
  /** Returns a bearer token for each call (e.g. from the identity provider). */
  getToken?: () => Promise<string | undefined> | string | undefined;
  fetch?: typeof fetch;
}

/**
 * IoClient over HTTP. Routes follow `/v1/<domain>`; the server implements the same
 * contract by fanning out to connectors.
 */
export function createHttpClient(options: HttpClientOptions): IoClient {
  const base = options.baseUrl.replace(/\/$/, '');
  const doFetch = options.fetch ?? fetch;

  async function call<T>(method: string, path: string, body?: unknown, query?: Record<string, unknown>): Promise<T> {
    const url = new URL(base + '/v1' + path);
    for (const [k, v] of Object.entries(query ?? {})) {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    }
    const token = await options.getToken?.();
    const res = await doFetch(url.toString(), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new IoError(err.message ?? res.statusText, res.status, err.code);
    }
    return (res.status === 204 ? undefined : await res.json()) as T;
  }

  const id = encodeURIComponent;

  return {
    me: () => call('GET', '/me'),
    people: {
      get: personId => call('GET', `/people/${id(personId)}`),
      search: q => call('GET', '/people', undefined, { q }),
    },
    places: {
      list: () => call('GET', '/places'),
      get: placeId => call('GET', `/places/${id(placeId)}`),
    },
    assets: {
      list: (query = {}) => call<Asset[]>('GET', '/assets', undefined, query),
      get: assetId => call('GET', `/assets/${id(assetId)}`),
      report: (assetId, report) => call('POST', `/assets/${id(assetId)}/reports`, report),
    },
    requests: {
      list: (query = {}) => call('GET', '/requests', undefined, query as Record<string, unknown>),
      get: requestId => call('GET', `/requests/${id(requestId)}`),
      create: input => call('POST', '/requests', input),
      comment: (requestId, text) => call('POST', `/requests/${id(requestId)}/comments`, { text }),
      reopen: (requestId, reason) => call('POST', `/requests/${id(requestId)}/reopen`, { reason }),
      cancel: (requestId, reason) => call('POST', `/requests/${id(requestId)}/cancel`, { reason }),
      decide: (requestId, decision, note) => call('POST', `/requests/${id(requestId)}/decision`, { decision, note }),
    },
    knowledge: {
      search: (query = {}) => call('GET', '/knowledge', undefined, query as Record<string, unknown>),
      get: articleId => call('GET', `/knowledge/${id(articleId)}`),
      categories: () => call('GET', '/knowledge/categories'),
      feedback: (articleId, helpful) => call('POST', `/knowledge/${id(articleId)}/feedback`, { helpful }),
    },
    catalog: {
      list: (query = {}) => call('GET', '/catalog', undefined, query),
      get: itemId => call('GET', `/catalog/${id(itemId)}`),
      categories: () => call('GET', '/catalog/categories'),
    },
    events: {
      list: (query = {}) => call('GET', '/events', undefined, query),
      subscribe(listener: (event: OrgEvent) => void) {
        const url = new URL(base + '/v1/events/stream');
        const source = new EventSource(url.toString(), { withCredentials: true });
        source.onmessage = message => listener(JSON.parse(message.data) as OrgEvent);
        return () => source.close();
      },
    },
    search: q => call('GET', '/search', undefined, { q }),
  };
}
