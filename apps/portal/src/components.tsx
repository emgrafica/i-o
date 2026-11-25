import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Asset, Request } from '@i-o/api';
import { Badge, Card, Icon, Skeleton, Stack } from '@i-o/ui';
import { assetIcon, relative, statusTone } from './format';

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="page-header">
      {eyebrow && <div className="ui-eyebrow">{eyebrow}</div>}
      <h1 className="ui-h1">{title}</h1>
      {children && <div className="page-header__lead">{children}</div>}
    </div>
  );
}

export function StatusBadge({ status }: { status: Request['status'] }) {
  const { t } = useTranslation();
  return <Badge tone={statusTone(status)}>{t(`status.${status}`)}</Badge>;
}

export function RequestRow({ request }: { request: Request }) {
  const { t } = useTranslation();
  return (
    <Link to={`/requests/${request.id}`} className="list-row">
      <div className="list-row__icon"><Icon name={request.kind === 'order' ? 'bag' : request.kind === 'approval' ? 'check' : 'ticket'} /></div>
      <div className="list-row__main">
        <div className="list-row__title">{request.title}</div>
        <div className="ui-small ui-muted">{request.number} · {t(`kind.${request.kind}`)} · {t('requests.updated', { when: relative(request.updatedAt) })}</div>
      </div>
      <StatusBadge status={request.status} />
    </Link>
  );
}

export function AssetCard({ asset }: { asset: Asset }) {
  const { t } = useTranslation();
  return (
    <Link to={`/technology/${asset.id}`} className="ui-card ui-card--link asset-card">
      <div className="asset-card__icon"><Icon name={assetIcon(asset.kind)} size={28} /></div>
      <div>
        <div className="ui-eyebrow">{t(`assetKind.${asset.kind}`)}</div>
        <div className="ui-h3">{asset.name}</div>
        <div className="ui-small ui-muted">{[asset.manufacturer, asset.model].filter(Boolean).join(' · ')}</div>
      </div>
      {asset.status !== 'in-use' && <Badge tone={asset.status === 'lost' ? 'danger' : 'warning'}>{t(`assetStatus.${asset.status}`)}</Badge>}
    </Link>
  );
}

export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <Stack gap="12px">
      {Array.from({ length: rows }, (_, i) => <Skeleton key={i} height={56} />)}
    </Stack>
  );
}

export function ErrorCard({ error, onRetry }: { error: Error; onRetry?: () => void }) {
  const { t } = useTranslation();
  return (
    <Card flat>
      <Stack gap="8px">
        <strong>{t('common.error')}</strong>
        <span className="ui-small ui-muted">{error.message}</span>
        {onRetry && <div><button className="ui-btn ui-btn--secondary ui-btn--sm" onClick={onRetry}>{t('common.retry')}</button></div>}
      </Stack>
    </Card>
  );
}

export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="section">
      <div className="section__head">
        <h2 className="ui-h2">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
