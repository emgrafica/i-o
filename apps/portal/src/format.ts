import type { Asset, Money, Request, RequestStatus, Severity } from '@i-o/api';
import type { Tone } from '@i-o/ui';
import i18n from './i18n';

const lang = () => i18n.language || 'en';

export function formatDate(iso: string | undefined, style: 'date' | 'datetime' = 'date'): string {
  if (!iso) return '';
  const options: Intl.DateTimeFormatOptions = style === 'date'
    ? { day: 'numeric', month: 'short', year: 'numeric' }
    : { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat(lang(), options).format(new Date(iso));
}

/** "3 days ago", "in 20 days", "just now". */
export function relative(iso: string | undefined): string {
  if (!iso) return '';
  const diff = (Date.parse(iso) - Date.now()) / 1000;
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat(lang(), { numeric: 'auto' });
  if (abs < 60) return rtf.format(0, 'second');
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
  if (abs < 86_400) return rtf.format(Math.round(diff / 3600), 'hour');
  if (abs < 86_400 * 45) return rtf.format(Math.round(diff / 86_400), 'day');
  return rtf.format(Math.round(diff / (86_400 * 30)), 'month');
}

export function formatMoney(money: Money | undefined): string {
  if (!money) return '';
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: money.currency, maximumFractionDigits: 0 }).format(money.amount);
}

export function statusTone(status: RequestStatus): Tone {
  switch (status) {
    case 'new': return 'info';
    case 'in-progress': return 'neutral';
    case 'waiting-on-you': return 'warning';
    case 'resolved':
    case 'closed': return 'success';
    case 'cancelled': return 'neutral';
  }
}

export function severityTone(severity: Severity): 'info' | 'warning' | 'critical' {
  return severity;
}

export function assetIcon(kind: Asset['kind']): string {
  switch (kind) {
    case 'laptop':
    case 'desktop': return 'laptop';
    case 'phone':
    case 'tablet': return 'phone';
    case 'monitor': return 'monitor';
    case 'software': return 'box';
    case 'account': return 'key';
    default: return 'box';
  }
}

export const isOpen = (r: Request) => r.status === 'new' || r.status === 'in-progress' || r.status === 'waiting-on-you';

/** Days until an ISO date (negative when in the past). */
export const daysUntil = (iso?: string) => (iso ? Math.round((Date.parse(iso) - Date.now()) / 86_400_000) : undefined);
