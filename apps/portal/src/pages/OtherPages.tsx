import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Card, Empty, Facts, Field, Icon, Row, Select, Stack, buttonClass } from '@i-o/ui';
import { ErrorCard, ListSkeleton, PageHeader } from '../components';
import { formatDate } from '../format';
import { LANGUAGES } from '../i18n';
import { useIo, useQuery } from '../io';

export function ArticlePage() {
  const { t } = useTranslation();
  const { id = '' } = useParams();
  const io = useIo();
  const article = useQuery(client => client.knowledge.get(id), [id]);
  const [voted, setVoted] = useState(false);

  if (article.loading && !article.data) return <ListSkeleton rows={5} />;
  if (article.error) return <ErrorCard error={article.error} onRetry={article.reload} />;
  const a = article.data!;

  return (
    <Stack gap="24px">
      <div><Link to="/help" className="link-more">← {t('nav.help')}</Link></div>
      <PageHeader eyebrow={`${a.category} · ${a.id}`} title={a.title}>{a.summary}</PageHeader>
      <div className="detail">
        <Card>
          {/* Article HTML comes from the knowledge connector, which sanitises it. */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: a.body }} />
        </Card>
        <Stack gap="16px">
          <Card>
            <Stack gap="10px">
              <strong>{voted ? t('article.thanks') : t('article.helpful')}</strong>
              {!voted && (
                <Row>
                  <Button variant="secondary" size="sm" onClick={async () => { article.set(await io.knowledge.feedback(a.id, true)); setVoted(true); }}>{t('common.yes')}</Button>
                  <Button variant="secondary" size="sm" onClick={async () => { article.set(await io.knowledge.feedback(a.id, false)); setVoted(true); }}>{t('common.no')}</Button>
                </Row>
              )}
              <div className="ui-small ui-muted">{t('article.stats', { views: a.views, yes: a.helpful.yes })}</div>
            </Stack>
          </Card>
          <Card>
            <Stack gap="8px">
              <span className="ui-small">{t('article.updated', { date: formatDate(a.updatedAt) })}</span>
              <Link className={buttonClass('secondary', 'sm')} to={`/help?q=${encodeURIComponent(a.title)}`}>{t('article.stillStuck')}</Link>
            </Stack>
          </Card>
        </Stack>
      </div>
    </Stack>
  );
}

const HIT_ROUTES: Record<string, string> = { request: '/requests/', asset: '/technology/', knowledge: '/knowledge/', catalog: '/catalog/' };
const HIT_ICONS: Record<string, string> = { request: 'ticket', asset: 'laptop', knowledge: 'book', catalog: 'bag', person: 'home', place: 'home' };

export function SearchPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const hits = useQuery(io => io.search(q), [q]);

  return (
    <Stack gap="24px">
      <PageHeader eyebrow={t('shell.search')} title={t('search.title', { q })} />
      <Card>
        {hits.loading && !hits.data ? <ListSkeleton /> : (hits.data ?? []).length === 0 ? <Empty title={t('search.empty')}><Link to={`/help?q=${encodeURIComponent(q)}`}>{t('search.askHelp')}</Link></Empty> : (
          <div className="list">
            {hits.data!.map(hit => {
              const content = (
                <>
                  <div className="list-row__icon"><Icon name={HIT_ICONS[hit.kind] ?? 'info'} /></div>
                  <div className="list-row__main"><div className="list-row__title">{hit.title}</div><div className="ui-small ui-muted">{t(`search.kinds.${hit.kind}`)}{hit.subtitle ? ` · ${hit.subtitle}` : ''}</div></div>
                </>
              );
              return HIT_ROUTES[hit.kind]
                ? <Link key={`${hit.kind}-${hit.id}`} to={HIT_ROUTES[hit.kind] + hit.id} className="list-row">{content}</Link>
                : <div key={`${hit.kind}-${hit.id}`} className="list-row">{content}</div>;
            })}
          </div>
        )}
      </Card>
    </Stack>
  );
}

export function PreferencesPage() {
  const { t, i18n } = useTranslation();
  const me = useQuery(io => io.me());
  const places = useQuery(io => io.places.list());
  const place = places.data?.find(p => p.id === me.data?.placeId);

  return (
    <Stack gap="24px">
      <PageHeader eyebrow={t('nav.preferences')} title={t('prefs.title')} />
      {me.data && (
        <Card>
          <Row gap="16px">
            <Avatar name={me.data.name} size={56} />
            <div>
              <div className="ui-h2">{me.data.name}</div>
              <div className="ui-muted">{[me.data.title, me.data.department].filter(Boolean).join(' · ')}</div>
            </div>
          </Row>
          <div style={{ marginTop: 20 }}>
            <Facts items={[[t('prefs.email'), me.data.email], [t('prefs.location'), place?.name ?? '-']]} />
          </div>
        </Card>
      )}
      <Card>
        <Field label={t('prefs.language')} htmlFor="lang">
          <Select id="lang" value={i18n.language} onChange={e => void i18n.changeLanguage(e.target.value)}
            options={LANGUAGES.map(l => ({ value: l.code, label: l.label }))} />
        </Field>
      </Card>
    </Stack>
  );
}

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <Empty title={t('notFound.title')}>
      <Link className={buttonClass('primary')} to="/">{t('nav.home')}</Link>
    </Empty>
  );
}
