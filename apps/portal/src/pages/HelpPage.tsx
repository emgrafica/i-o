import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, Field, Grid, Input, SearchInput, Select, Stack, Textarea } from '@i-o/ui';
import { ListSkeleton, PageHeader, Section } from '../components';
import { useIo, useQuery } from '../io';

export function HelpPage() {
  const { t } = useTranslation();
  const io = useIo();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const initial = params.get('q') ?? '';
  const [q, setQ] = useState(initial);
  const [debounced, setDebounced] = useState(initial);
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState(initial);
  const [description, setDescription] = useState('');
  const [assetId, setAssetId] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(q), 250);
    return () => clearTimeout(timer);
  }, [q]);
  useEffect(() => {
    setParams(debounced ? { q: debounced } : {}, { replace: true });
  }, [debounced, setParams]);

  const articles = useQuery(client => client.knowledge.search({ q: debounced, category, limit: 8 }), [debounced, category]);
  const categories = useQuery(client => client.knowledge.categories());
  const assets = useQuery(client => client.assets.list());

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSending(true);
    try {
      const request = await io.requests.create({ kind: 'incident', title, description, assetId: assetId || undefined });
      navigate(`/requests/${request.id}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Stack gap="32px">
      <PageHeader eyebrow={t('nav.help')} title={t('help.title')}>{t('help.lead')}</PageHeader>

      <SearchInput label={t('help.searchLabel')} placeholder={t('help.searchPlaceholder')} value={q} onChange={e => setQ(e.target.value)} autoFocus />

      <div className="ui-row">
        <button className={`chip${!category ? ' chip--on' : ''}`} onClick={() => setCategory(undefined)}>{t('common.all')}</button>
        {(categories.data ?? []).map(c => (
          <button key={c} className={`chip${category === c ? ' chip--on' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      <Section title={debounced ? t('help.results', { count: articles.data?.total ?? 0 }) : t('help.popular')}>
        {articles.loading && !articles.data ? <ListSkeleton /> : (
          (articles.data?.items.length ?? 0) === 0
            ? <p className="ui-muted">{t('help.noResults')}</p>
            : (
              <Grid min="280px">
                {articles.data!.items.map(article => (
                  <Link key={article.id} to={`/knowledge/${article.id}`} className="ui-card ui-card--link">
                    <div className="ui-eyebrow">{article.category}</div>
                    <div className="ui-h3">{article.title}</div>
                    <p className="ui-small ui-muted">{article.summary}</p>
                  </Link>
                ))}
              </Grid>
            )
        )}
      </Section>

      <Section title={t('help.stillNeed')}>
        <Card>
          <form onSubmit={submit}>
            <Stack gap="16px">
              <Field label={t('help.form.title')} htmlFor="help-title">
                <Input id="help-title" required value={title} onChange={e => setTitle(e.target.value)} placeholder={t('help.form.titlePlaceholder')} />
              </Field>
              <Field label={t('help.form.details')} htmlFor="help-details" hint={t('help.form.detailsHint')}>
                <Textarea id="help-details" value={description} onChange={e => setDescription(e.target.value)} />
              </Field>
              <Field label={t('help.form.device')} htmlFor="help-device">
                <Select id="help-device" value={assetId} onChange={e => setAssetId(e.target.value)}
                  options={[{ value: '', label: t('help.form.noDevice') }, ...(assets.data ?? []).map(a => ({ value: a.id, label: a.name }))]} />
              </Field>
              <div><Button type="submit" disabled={sending || !title.trim()}>{sending ? t('common.sending') : t('help.form.submit')}</Button></div>
            </Stack>
          </form>
        </Card>
      </Section>
    </Stack>
  );
}
