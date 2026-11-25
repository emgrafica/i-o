import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { RequestQuery } from '@i-o/api';
import { Card, Empty, SearchInput, Stack, Tabs } from '@i-o/ui';
import { ErrorCard, ListSkeleton, PageHeader, RequestRow } from '../components';
import { useQuery } from '../io';

type Filter = 'open' | 'approval' | 'all' | 'closed';

export function RequestsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>('open');
  const [q, setQ] = useState('');
  const query: RequestQuery = filter === 'open' ? { status: 'open' }
    : filter === 'approval' ? { kind: 'approval' }
    : filter === 'closed' ? { status: 'closed' } : {};
  const requests = useQuery(io => io.requests.list({ ...query, q: q || undefined, limit: 50 }), [filter, q]);

  return (
    <Stack gap="24px">
      <PageHeader eyebrow={t('nav.requests')} title={t('requests.title')}>{t('requests.lead')}</PageHeader>
      <div className="toolbar">
        <Tabs<Filter> label={t('requests.filter')} value={filter} onChange={setFilter} tabs={[
          { value: 'open', label: t('requests.tabs.open') },
          { value: 'approval', label: t('requests.tabs.approvals') },
          { value: 'closed', label: t('requests.tabs.closed') },
          { value: 'all', label: t('requests.tabs.all') },
        ]} />
        <div style={{ minWidth: 240 }}><SearchInput label={t('requests.search')} placeholder={t('requests.search')} value={q} onChange={e => setQ(e.target.value)} /></div>
      </div>
      <Card>
        {requests.loading && !requests.data ? <ListSkeleton rows={4} />
          : requests.error ? <ErrorCard error={requests.error} onRetry={requests.reload} />
          : requests.data!.items.length === 0 ? <Empty title={t('requests.empty')} />
          : <div className="list">{requests.data!.items.map(r => <RequestRow key={r.id} request={r} />)}</div>}
      </Card>
    </Stack>
  );
}
