import type {
  Asset, AssetReport, CatalogItem, Id, KnowledgeArticle, KnowledgeQuery, NewRequest, OrgEvent,
  Page, Person, Place, Request, RequestQuery, SearchHit,
} from './types';

/**
 * The i-o API as seen by a surface (portal, catalog, hub, chat, agents).
 * Implemented by `createHttpClient` (talks to an i-o server) and by connectors
 * such as `@i-o/connector-mock` (runs in the browser with sample data).
 */
export interface IoClient {
  /** The signed-in person. */
  me(): Promise<Person>;

  people: {
    get(id: Id): Promise<Person>;
    search(q: string): Promise<Person[]>;
  };

  places: {
    list(): Promise<Place[]>;
    get(id: Id): Promise<Place>;
  };

  assets: {
    /** Defaults to the signed-in person's assets. */
    list(query?: { assignedTo?: Id; kind?: Asset['kind'] }): Promise<Asset[]>;
    get(id: Id): Promise<Asset>;
    /** Reports a problem or asks for a return/refresh; opens and returns a request. */
    report(id: Id, report: AssetReport): Promise<Request>;
  };

  requests: {
    list(query?: RequestQuery): Promise<Page<Request>>;
    get(id: Id): Promise<Request>;
    create(input: NewRequest): Promise<Request>;
    comment(id: Id, text: string): Promise<Request>;
    reopen(id: Id, reason: string): Promise<Request>;
    cancel(id: Id, reason?: string): Promise<Request>;
    /** For approvals assigned to the signed-in person. */
    decide(id: Id, decision: 'approve' | 'reject', note?: string): Promise<Request>;
  };

  knowledge: {
    search(query?: KnowledgeQuery): Promise<Page<KnowledgeArticle>>;
    get(id: Id): Promise<KnowledgeArticle>;
    categories(): Promise<string[]>;
    feedback(id: Id, helpful: boolean): Promise<KnowledgeArticle>;
  };

  catalog: {
    list(query?: { category?: string; q?: string }): Promise<CatalogItem[]>;
    get(id: Id): Promise<CatalogItem>;
    categories(): Promise<string[]>;
  };

  events: {
    /** Current and upcoming events relevant to the signed-in person. */
    list(query?: { active?: boolean }): Promise<OrgEvent[]>;
    /** Live events; returns an unsubscribe function. */
    subscribe(listener: (event: OrgEvent) => void): () => void;
  };

  /** One search across requests, assets, knowledge, catalog, people and places. */
  search(q: string): Promise<SearchHit[]>;
}

/** Error thrown by every client for a failed call. */
export class IoError extends Error {
  constructor(message: string, readonly status: number, readonly code?: string) {
    super(message);
    this.name = 'IoError';
  }
}
