import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Request } from '@i-o/api';
import { Button, Card, Facts, Field, Icon, Row, SideSheet, Stack, Textarea, Timeline } from '@i-o/ui';
import { ErrorCard, ListSkeleton, PageHeader, StatusBadge } from '../components';
import { formatDate, isOpen, relative } from '../format';
import { useIo, useQuery } from '../io';

export function RequestPage() {
  const { t } = useTranslation();
  const { id = '' } = useParams();
  const io = useIo();
  const request = useQuery(client => client.requests.get(id), [id]);
  const asset = useQuery(client => (request.data?.assetId ? client.assets.get(request.data.assetId) : Promise.resolve(undefined)), [request.data?.assetId]);
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [sheet, setSheet] = useState<'reopen' | 'cancel' | null>(null);
  const [reason, setReason] = useState('');

  if (request.loading && !request.data) return <ListSkeleton rows={5} />;
  if (request.error) return <ErrorCard error={request.error} onRetry={request.reload} />;
  const r = request.data!;

  const run = async (action: () => Promise<Request>) => {
    setBusy(true);
    try { request.set(await action()); } finally { setBusy(false); }
  };

  const sendComment = async (event: FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) return;
    await run(() => io.requests.comment(r.id, comment.trim()));
    setComment('');
  };

  const isApprover = r.kind === 'approval' && r.status === 'waiting-on-you';

  return (
    <Stack gap="24px">
      <div><Link to="/requests" className="link-more">← {t('nav.requests')}</Link></div>
      <PageHeader eyebrow={`${r.number} · ${t(`kind.${r.kind}`)}`} title={r.title}>
        <Row><StatusBadge status={r.status} /><span className="ui-small ui-muted">{t('requests.updated', { when: relative(r.updatedAt) })}</span></Row>
      </PageHeader>

      {isApprover && (
        <Card>
          <Stack gap="12px">
            <strong>{t('request.approvalAsk')}</strong>
            {r.description && <p className="ui-muted" style={{ margin: 0 }}>{r.description}</p>}
            <Row>
              <Button disabled={busy} onClick={() => run(() => io.requests.decide(r.id, 'approve'))}>{t('request.approve')}</Button>
              <Button variant="secondary" disabled={busy} onClick={() => run(() => io.requests.decide(r.id, 'reject'))}>{t('request.reject')}</Button>
            </Row>
          </Stack>
        </Card>
      )}

      <div className="detail">
        <Card>
          <Stack gap="20px">
            {r.description && <p style={{ margin: 0 }}>{r.description}</p>}
            <Timeline items={r.timeline.map(entry => ({
              id: entry.id,
              who: entry.author?.name ?? 'i-o',
              automated: entry.author?.automated,
              when: formatDate(entry.at, 'datetime'),
              text: entry.text,
              kind: entry.kind,
            }))} />
            {r.kind !== 'approval' && r.status !== 'cancelled' && r.status !== 'closed' && (
              <form onSubmit={sendComment}>
                <Stack gap="10px">
                  <Field label={t('request.addComment')} htmlFor="comment">
                    <Textarea id="comment" value={comment} onChange={e => setComment(e.target.value)} placeholder={t('request.commentPlaceholder')} />
                  </Field>
                  <div><Button type="submit" disabled={busy || !comment.trim()}>{t('request.send')}</Button></div>
                </Stack>
              </form>
            )}
          </Stack>
        </Card>

        <Stack gap="16px">
          <Card>
            <Facts items={[
              [t('request.facts.opened'), formatDate(r.createdAt)],
              ...(r.dueAt ? [[t('request.facts.due'), formatDate(r.dueAt)] as [string, string]] : []),
              ...(r.resolvedAt ? [[t('request.facts.resolved'), formatDate(r.resolvedAt)] as [string, string]] : []),
              [t('request.facts.priority'), t(`priority.${r.priority}`)],
              [t('request.facts.assignee'), r.assignee ? `${r.assignee.name}${r.assignee.team && r.assignee.team !== r.assignee.name ? ` (${r.assignee.team})` : ''}` : t('request.unassigned')],
              [t('request.facts.source'), `${r.source.system} · ${r.source.id}`],
            ]} />
          </Card>
          {asset.data && (
            <Link to={`/technology/${asset.data.id}`} className="ui-card ui-card--link">
              <div className="ui-eyebrow">{t('request.relatedDevice')}</div>
              <Row><Icon name="laptop" /><strong>{asset.data.name}</strong></Row>
              <div className="ui-small ui-muted">{asset.data.serialNumber}</div>
            </Link>
          )}
          {r.attachments.length > 0 && (
            <Card>
              <div className="ui-eyebrow" style={{ marginBottom: 8 }}>{t('request.attachments')}</div>
              {r.attachments.map(a => <div key={a.id} className="ui-small">{a.name} <span className="ui-muted">({Math.round(a.size / 1024)} KB)</span></div>)}
            </Card>
          )}
          <Row>
            {r.status === 'resolved' && <Button variant="secondary" onClick={() => setSheet('reopen')}>{t('request.reopen')}</Button>}
            {isOpen(r) && r.kind !== 'approval' && <Button variant="ghost" onClick={() => setSheet('cancel')}>{t('request.cancel')}</Button>}
          </Row>
        </Stack>
      </div>

      <SideSheet open={sheet !== null} onClose={() => setSheet(null)} title={sheet === 'reopen' ? t('request.reopen') : t('request.cancel')}
        footer={<>
          <Button variant="ghost" onClick={() => setSheet(null)}>{t('common.back')}</Button>
          <Button disabled={busy || (sheet === 'reopen' && !reason.trim())} onClick={async () => {
            await run(() => (sheet === 'reopen' ? io.requests.reopen(r.id, reason) : io.requests.cancel(r.id, reason || undefined)));
            setSheet(null); setReason('');
          }}>{sheet === 'reopen' ? t('request.reopen') : t('request.confirmCancel')}</Button>
        </>}>
        <Field label={sheet === 'reopen' ? t('request.reopenWhy') : t('request.cancelWhy')} htmlFor="reason">
          <Textarea id="reason" value={reason} onChange={e => setReason(e.target.value)} />
        </Field>
      </SideSheet>
    </Stack>
  );
}
