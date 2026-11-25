import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Grid, Icon, Notice, Stack, buttonClass } from '@i-o/ui';
import { AssetCard, ErrorCard, ListSkeleton, RequestRow, Section } from '../components';
import { daysUntil, isOpen } from '../format';
import { useQuery } from '../io';

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ask, setAsk] = useState('');
  const me = useQuery(io => io.me());
  const requests = useQuery(io => io.requests.list({ status: 'open' }));
  const assets = useQuery(io => io.assets.list());
  const events = useQuery(io => io.events.list({ active: true }));
  const articles = useQuery(io => io.knowledge.search({ limit: 4 }));

  const firstName = me.data?.name.split(' ')[0];
  const waiting = (requests.data?.items ?? []).filter(r => r.status === 'waiting-on-you');
  const personal = (events.data ?? []).filter(e => e.personal);
  const refreshDue = (assets.data ?? []).filter(a => (daysUntil(a.refreshEligibleAt) ?? 1) <= 0);

  const submitAsk = (event: FormEvent) => {
    event.preventDefault();
    if (ask.trim()) navigate(`/help?q=${encodeURIComponent(ask.trim())}`);
  };

  return (
    <Stack gap="40px">
      <section className="hero">
        <div className="ui-eyebrow">{t('home.eyebrow')}</div>
        <h1 className="ui-h1">{firstName ? t('home.greeting', { name: firstName }) : t('home.greetingAnon')}</h1>
        <form className="ask" onSubmit={submitAsk}>
          <Icon name="spark" />
          <input value={ask} onChange={e => setAsk(e.target.value)} placeholder={t('home.askPlaceholder')} aria-label={t('home.ask')} />
          <button className={buttonClass('primary')} type="submit">{t('home.askButton')}</button>
        </form>
        <div className="ui-row ui-small ui-muted">
          {['home.suggest1', 'home.suggest2', 'home.suggest3'].map(key => (
            <button key={key} className="chip" onClick={() => navigate(`/help?q=${encodeURIComponent(t(key))}`)}>{t(key)}</button>
          ))}
        </div>
      </section>

      {(waiting.length > 0 || personal.length > 0) && (
        <Section title={t('home.attention')}>
          <Stack gap="10px">
            {personal.map(event => (
              <Notice key={event.id} tone={event.severity === 'critical' ? 'critical' : event.severity === 'warning' ? 'warning' : 'info'} title={event.title}
                action={event.affects?.assetIds?.[0] ? <Link className={buttonClass('secondary', 'sm')} to={`/technology/${event.affects.assetIds[0]}`}>{t('common.view')}</Link> : undefined}>
                {event.body}
              </Notice>
            ))}
            {waiting.map(request => (
              <Notice key={request.id} tone="warning" title={request.kind === 'approval' ? t('home.approvalWaiting', { title: request.title }) : t('home.replyWaiting', { number: request.number })}
                action={<Link className={buttonClass('secondary', 'sm')} to={`/requests/${request.id}`}>{t('common.open')}</Link>}>
                {request.kind === 'approval' ? request.description : request.title}
              </Notice>
            ))}
          </Stack>
        </Section>
      )}

      <div className="two-col">
        <Section title={t('home.openRequests')} action={<Link to="/requests" className="link-more">{t('common.seeAll')} <Icon name="arrow" size={16} /></Link>}>
          <Card>
            {requests.loading && !requests.data ? <ListSkeleton /> : requests.error ? <ErrorCard error={requests.error} onRetry={requests.reload} /> : (
              (requests.data?.items ?? []).filter(isOpen).length === 0
                ? <p className="ui-muted">{t('home.noOpen')}</p>
                : <div className="list">{(requests.data?.items ?? []).filter(isOpen).slice(0, 4).map(r => <RequestRow key={r.id} request={r} />)}</div>
            )}
          </Card>
        </Section>

        <Section title={t('home.status')}>
          <Card>
            {(events.data ?? []).filter(e => !e.personal).length === 0
              ? <p className="ui-muted">{t('home.allGood')}</p>
              : (
                <Stack gap="14px">
                  {(events.data ?? []).filter(e => !e.personal).map(event => (
                    <div key={event.id} className="status-item">
                      <span className={`dot dot--${event.severity}`} aria-hidden />
                      <div><strong>{event.title}</strong><div className="ui-small ui-muted">{event.body}</div></div>
                    </div>
                  ))}
                </Stack>
              )}
          </Card>
        </Section>
      </div>

      <Section title={t('home.myTechnology')} action={<Link to="/technology" className="link-more">{t('common.seeAll')} <Icon name="arrow" size={16} /></Link>}>
        {refreshDue.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Notice tone="info" title={t('home.refreshDue', { name: refreshDue[0].name })}
              action={<Link className={buttonClass('primary', 'sm')} to={`/technology/${refreshDue[0].id}?report=refresh`}>{t('technology.actions.refresh')}</Link>} />
          </div>
        )}
        {assets.loading && !assets.data ? <ListSkeleton rows={2} /> : (
          <Grid min="240px">{(assets.data ?? []).slice(0, 4).map(asset => <AssetCard key={asset.id} asset={asset} />)}</Grid>
        )}
      </Section>

      <Section title={t('home.popular')} action={<Link to="/help" className="link-more">{t('nav.help')} <Icon name="arrow" size={16} /></Link>}>
        <Grid min="240px">
          {(articles.data?.items ?? []).map(article => (
            <Link key={article.id} to={`/knowledge/${article.id}`} className="ui-card ui-card--link">
              <div className="ui-eyebrow">{article.category}</div>
              <div className="ui-h3">{article.title}</div>
              <p className="ui-small ui-muted">{article.summary}</p>
            </Link>
          ))}
        </Grid>
      </Section>
    </Stack>
  );
}
