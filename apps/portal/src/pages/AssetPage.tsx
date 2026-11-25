import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { AssetReportKind } from '@i-o/api';
import { Badge, Button, Card, Facts, Field, Icon, Input, Notice, Row, SideSheet, Stack, Textarea } from '@i-o/ui';
import { ErrorCard, ListSkeleton, PageHeader, RequestRow, Section } from '../components';
import { assetIcon, daysUntil, formatDate } from '../format';
import { useIo, useQuery } from '../io';

const REPORTS: AssetReportKind[] = ['broken', 'lost-or-stolen', 'return', 'refresh'];

export function AssetPage() {
  const { t } = useTranslation();
  const { id = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const io = useIo();
  const asset = useQuery(client => client.assets.get(id), [id]);
  const related = useQuery(client => client.requests.list({ limit: 50 }), [id]);
  const [kind, setKind] = useState<AssetReportKind | null>(null);
  const [details, setDetails] = useState('');
  const [where, setWhere] = useState('');
  const [sending, setSending] = useState(false);

  // Deep link: /technology/:id?report=refresh opens the sheet.
  useEffect(() => {
    const requested = params.get('report') as AssetReportKind | null;
    if (requested && REPORTS.includes(requested)) setKind(requested);
  }, [params]);

  const close = () => { setKind(null); setDetails(''); setWhere(''); if (params.has('report')) setParams({}, { replace: true }); };

  if (asset.loading && !asset.data) return <ListSkeleton rows={4} />;
  if (asset.error) return <ErrorCard error={asset.error} onRetry={asset.reload} />;
  const a = asset.data!;
  const warrantyDays = daysUntil(a.warrantyEndsAt);
  const refreshDays = daysUntil(a.refreshEligibleAt);
  const relatedRequests = (related.data?.items ?? []).filter(r => r.assetId === a.id);
  const isDevice = !['software', 'account'].includes(a.kind);

  const submit = async () => {
    if (!kind) return;
    setSending(true);
    try {
      const request = await io.assets.report(a.id, {
        kind,
        details: details || t(`technology.reports.${kind}.title`),
        ...(kind === 'lost-or-stolen' ? { lastSeen: { where } } : {}),
      });
      navigate(`/requests/${request.id}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Stack gap="24px">
      <div><Link to="/technology" className="link-more">← {t('nav.technology')}</Link></div>
      <PageHeader eyebrow={t(`assetKind.${a.kind}`)} title={a.name}>
        <Row>
          <Badge tone={a.status === 'in-use' ? 'success' : a.status === 'lost' ? 'danger' : 'warning'}>{t(`assetStatus.${a.status}`)}</Badge>
          {a.serialNumber && <span className="ui-small ui-muted">{t('technology.serial')} {a.serialNumber}</span>}
        </Row>
      </PageHeader>

      {warrantyDays !== undefined && warrantyDays >= 0 && warrantyDays <= 30 && (
        <Notice tone="warning" title={t('technology.warrantySoon', { count: warrantyDays })}>
          {refreshDays !== undefined && refreshDays <= 0 ? t('technology.refreshEligible') : undefined}
        </Notice>
      )}

      <div className="detail">
        <Card>
          <Stack gap="20px">
            <Row gap="16px">
              <div className="asset-hero"><Icon name={assetIcon(a.kind)} size={40} /></div>
              <div>
                <div className="ui-h3">{[a.manufacturer, a.model].filter(Boolean).join(' · ')}</div>
                {a.acquiredAt && <div className="ui-small ui-muted">{t('technology.since', { date: formatDate(a.acquiredAt) })}</div>}
              </div>
            </Row>
            <Facts items={[
              ...Object.entries(a.specs ?? {}),
              ...(a.warrantyEndsAt ? [[t('technology.warranty'), formatDate(a.warrantyEndsAt)] as [string, string]] : []),
              ...(a.refreshEligibleAt ? [[t('technology.refreshFrom'), formatDate(a.refreshEligibleAt)] as [string, string]] : []),
            ]} />
          </Stack>
        </Card>

        <Card>
          <Stack gap="10px">
            <div className="ui-eyebrow">{t('technology.needSomething')}</div>
            {REPORTS.filter(k => isDevice || k === 'broken').map(k => (
              <button key={k} className="action-row" onClick={() => setKind(k)} disabled={a.status === 'lost' && k === 'lost-or-stolen'}>
                <span><strong>{t(`technology.reports.${k}.title`)}</strong><br /><span className="ui-small ui-muted">{t(`technology.reports.${k}.hint`)}</span></span>
                <Icon name="arrow" size={18} />
              </button>
            ))}
          </Stack>
        </Card>
      </div>

      {relatedRequests.length > 0 && (
        <Section title={t('technology.relatedRequests')}>
          <Card><div className="list">{relatedRequests.map(r => <RequestRow key={r.id} request={r} />)}</div></Card>
        </Section>
      )}

      <SideSheet open={kind !== null} onClose={close} title={kind ? t(`technology.reports.${kind}.title`) : ''}
        footer={<><Button variant="ghost" onClick={close}>{t('common.back')}</Button><Button disabled={sending} onClick={submit}>{sending ? t('common.sending') : t('technology.submit')}</Button></>}>
        {kind && (
          <Stack gap="16px">
            <p className="ui-muted" style={{ margin: 0 }}>{t(`technology.reports.${kind}.explain`)}</p>
            {kind === 'lost-or-stolen' && (
              <Field label={t('technology.lastSeen')} htmlFor="where"><Input id="where" value={where} onChange={e => setWhere(e.target.value)} /></Field>
            )}
            <Field label={t('technology.details')} htmlFor="details" hint={t('technology.detailsHint')}>
              <Textarea id="details" value={details} onChange={e => setDetails(e.target.value)} />
            </Field>
          </Stack>
        )}
      </SideSheet>
    </Stack>
  );
}
