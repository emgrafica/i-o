import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Card, Field, Grid, Icon, Row, SearchInput, Select, Stack, Textarea } from '@i-o/ui';
import { ErrorCard, ListSkeleton, PageHeader } from '../components';
import { formatMoney } from '../format';
import { useIo, useQuery } from '../io';

export function CatalogPage() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<string>();
  const [q, setQ] = useState('');
  const categories = useQuery(io => io.catalog.categories());
  const items = useQuery(io => io.catalog.list({ category, q: q || undefined }), [category, q]);

  return (
    <Stack gap="24px">
      <PageHeader eyebrow={t('nav.catalog')} title={t('catalog.title')}>{t('catalog.lead')}</PageHeader>
      <SearchInput label={t('catalog.search')} placeholder={t('catalog.search')} value={q} onChange={e => setQ(e.target.value)} />
      <div className="ui-row">
        <button className={`chip${!category ? ' chip--on' : ''}`} onClick={() => setCategory(undefined)}>{t('common.all')}</button>
        {(categories.data ?? []).map(c => <button key={c} className={`chip${category === c ? ' chip--on' : ''}`} onClick={() => setCategory(c)}>{c}</button>)}
      </div>
      {items.loading && !items.data ? <ListSkeleton rows={3} /> : items.error ? <ErrorCard error={items.error} onRetry={items.reload} /> : (
        <Grid min="250px">
          {items.data!.map(item => (
            <Link key={item.id} to={`/catalog/${item.id}`} className="ui-card ui-card--link catalog-card">
              <div className="catalog-card__img"><Icon name="box" size={36} /></div>
              <div className="ui-eyebrow">{item.category}</div>
              <div className="ui-h3">{item.name}</div>
              <Row spread>
                <strong>{item.price ? formatMoney(item.price) : t('catalog.free')}</strong>
                {item.approvalRequired && <Badge tone="info">{t('catalog.approval')}</Badge>}
              </Row>
            </Link>
          ))}
        </Grid>
      )}
    </Stack>
  );
}

export function CatalogItemPage() {
  const { t } = useTranslation();
  const { id = '' } = useParams();
  const io = useIo();
  const navigate = useNavigate();
  const item = useQuery(client => client.catalog.get(id), [id]);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);

  if (item.loading && !item.data) return <ListSkeleton rows={4} />;
  if (item.error) return <ErrorCard error={item.error} onRetry={item.reload} />;
  const c = item.data!;

  const order = async () => {
    setSending(true);
    try {
      const options = Object.fromEntries((c.options ?? []).map(o => [o.name, choices[o.name] ?? o.values[0]]));
      const request = await io.requests.create({ kind: 'order', title: c.name, description: note || undefined, catalogItemId: c.id, options });
      navigate(`/requests/${request.id}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Stack gap="24px">
      <div><Link to="/catalog" className="link-more">← {t('nav.catalog')}</Link></div>
      <PageHeader eyebrow={c.category} title={c.name}>{c.description}</PageHeader>
      <div className="detail">
        <Card>
          <Stack gap="16px">
            {(c.options ?? []).map(option => (
              <Field key={option.name} label={option.name} htmlFor={`opt-${option.name}`}>
                <Select id={`opt-${option.name}`} value={choices[option.name] ?? option.values[0]}
                  onChange={e => setChoices(prev => ({ ...prev, [option.name]: e.target.value }))}
                  options={option.values.map(v => ({ value: v, label: v }))} />
              </Field>
            ))}
            <Field label={t('catalog.note')} htmlFor="note"><Textarea id="note" value={note} onChange={e => setNote(e.target.value)} /></Field>
            <div><Button onClick={order} disabled={sending}>{sending ? t('common.sending') : t('catalog.order')}</Button></div>
          </Stack>
        </Card>
        <Card>
          <Stack gap="10px">
            <div className="ui-h2">{c.price ? formatMoney(c.price) : t('catalog.free')}</div>
            {c.leadTimeDays !== undefined && <div className="ui-small">{t('catalog.leadTime', { count: c.leadTimeDays })}</div>}
            <div className="ui-small ui-muted">{c.approvalRequired ? t('catalog.approvalExplain') : t('catalog.noApproval')}</div>
          </Stack>
        </Card>
      </div>
    </Stack>
  );
}
