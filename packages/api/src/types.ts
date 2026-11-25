/**
 * The i-o domain model: one vendor-neutral model of an organisation.
 *
 * Every connector (ITSM, identity, HR, asset, procurement, knowledge, IoT …) maps its
 * system's records onto these types. Surfaces (portal, catalog, hub, chat, the
 * intelligence layer) only ever see these types, never a vendor's shapes.
 */

export type Id = string;
/** ISO 8601 timestamp, e.g. "2026-11-25T18:30:00Z". */
export type Instant = string;

/** Where a record came from. Lets i-o link back to the system of record. */
export interface SourceRef {
  /** Connector that supplied the record, e.g. "mock", "servicenow", "entra-id". */
  system: string;
  /** The record's ID in that system. */
  id: string;
  /** Deep link into that system, if it has one. */
  url?: string;
}

export interface Page<T> {
  items: T[];
  total: number;
  /** Pass back as `cursor` to get the next page; absent on the last page. */
  nextCursor?: string;
}

// ---------------------------------------------------------------- people and places

export interface Person {
  id: Id;
  name: string;
  email: string;
  title?: string;
  department?: string;
  placeId?: Id;
  managerId?: Id;
  avatarUrl?: string;
  /** BCP 47 language tag, e.g. "en", "de". */
  language?: string;
  source: SourceRef;
}

export type PlaceKind = 'site' | 'building' | 'floor' | 'room';

export interface Place {
  id: Id;
  name: string;
  kind: PlaceKind;
  parentId?: Id;
  address?: string;
  timeZone?: string;
  source: SourceRef;
}

// ---------------------------------------------------------------- assets

export type AssetKind = 'laptop' | 'desktop' | 'phone' | 'tablet' | 'monitor' | 'peripheral' | 'software' | 'account';
export type AssetStatus = 'in-use' | 'in-stock' | 'in-repair' | 'lost' | 'retired';

export interface Asset {
  id: Id;
  kind: AssetKind;
  name: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  status: AssetStatus;
  assignedTo?: Id;
  placeId?: Id;
  acquiredAt?: Instant;
  warrantyEndsAt?: Instant;
  /** When the holder becomes eligible for a replacement. */
  refreshEligibleAt?: Instant;
  imageUrl?: string;
  /** Free-form facts shown on the detail page, e.g. { Memory: "16 GB" }. */
  specs?: Record<string, string>;
  source: SourceRef;
}

/** Things a person can report about an asset. Each one opens a request. */
export type AssetReportKind = 'broken' | 'lost-or-stolen' | 'return' | 'refresh';

export interface AssetReport {
  kind: AssetReportKind;
  details: string;
  /** For lost-or-stolen: when and where it was last seen. */
  lastSeen?: { at?: Instant; where?: string };
  /** For return and refresh: where to ship or collect. */
  shipping?: { address: string; contact?: string };
}

// ---------------------------------------------------------------- requests

export type RequestKind = 'incident' | 'order' | 'approval';
export type RequestStatus = 'new' | 'in-progress' | 'waiting-on-you' | 'resolved' | 'closed' | 'cancelled';
export type Priority = 'low' | 'normal' | 'high' | 'critical';

export interface Actor {
  id?: Id;
  name: string;
  team?: string;
  /** True when the action was taken by i-o itself (automation or an AI agent). */
  automated?: boolean;
}

export type TimelineKind = 'comment' | 'status' | 'system';

export interface TimelineEntry {
  id: Id;
  at: Instant;
  kind: TimelineKind;
  author?: Actor;
  text: string;
  /** For status entries: the new status. */
  status?: RequestStatus;
}

export interface Attachment {
  id: Id;
  name: string;
  size: number;
  contentType: string;
  url?: string;
}

export interface Request {
  id: Id;
  /** Human-facing reference, e.g. "INC-10234". */
  number: string;
  kind: RequestKind;
  title: string;
  description?: string;
  status: RequestStatus;
  priority: Priority;
  requestedBy: Id;
  requestedFor: Id;
  assignee?: Actor;
  assetId?: Id;
  catalogItemId?: Id;
  createdAt: Instant;
  updatedAt: Instant;
  resolvedAt?: Instant;
  /** Expected completion, when the system of record provides one. */
  dueAt?: Instant;
  timeline: TimelineEntry[];
  attachments: Attachment[];
  source: SourceRef;
}

export interface NewRequest {
  kind: Exclude<RequestKind, 'approval'>;
  title: string;
  description?: string;
  priority?: Priority;
  /** Defaults to the signed-in person. */
  requestedFor?: Id;
  assetId?: Id;
  catalogItemId?: Id;
  /** For orders: the chosen catalog options, e.g. { Colour: "Silver" }. */
  options?: Record<string, string>;
}

export interface RequestQuery {
  /** Only requests by or for the signed-in person. Default true. */
  mine?: boolean;
  kind?: RequestKind;
  status?: RequestStatus | 'open';
  q?: string;
  cursor?: string;
  limit?: number;
}

// ---------------------------------------------------------------- knowledge

export interface KnowledgeArticle {
  id: Id;
  title: string;
  summary: string;
  /** Sanitised HTML. */
  body: string;
  category: string;
  tags: string[];
  language: string;
  updatedAt: Instant;
  views: number;
  helpful: { yes: number; no: number };
  source: SourceRef;
}

export interface KnowledgeQuery {
  q?: string;
  category?: string;
  language?: string;
  cursor?: string;
  limit?: number;
}

// ---------------------------------------------------------------- catalog

export interface Money {
  amount: number;
  /** ISO 4217, e.g. "EUR". */
  currency: string;
}

export interface CatalogOption {
  name: string;
  values: string[];
}

export interface CatalogItem {
  id: Id;
  name: string;
  category: string;
  description: string;
  price?: Money;
  imageUrl?: string;
  approvalRequired: boolean;
  /** Typical time to fulfil, in working days. */
  leadTimeDays?: number;
  options?: CatalogOption[];
  source: SourceRef;
}

// ---------------------------------------------------------------- events (what the organism senses)

export type EventKind = 'outage' | 'degradation' | 'maintenance' | 'announcement' | 'asset' | 'request';
export type Severity = 'info' | 'warning' | 'critical';

export interface OrgEvent {
  id: Id;
  at: Instant;
  kind: EventKind;
  severity: Severity;
  title: string;
  body?: string;
  /** Services, places or assets affected. */
  affects?: { services?: string[]; placeIds?: Id[]; assetIds?: Id[] };
  /** Expected end, for outages and maintenance. */
  until?: Instant;
  /** Set when the event is about one of the signed-in person's own things. */
  personal?: boolean;
  source: SourceRef;
}

// ---------------------------------------------------------------- search

export type SearchHitKind = 'request' | 'asset' | 'knowledge' | 'catalog' | 'person' | 'place';

export interface SearchHit {
  kind: SearchHitKind;
  id: Id;
  title: string;
  subtitle?: string;
}
