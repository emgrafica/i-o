import { useTranslation } from 'react-i18next';
import type { Asset } from '@i-o/api';
import { Empty, Grid, Stack } from '@i-o/ui';
import { AssetCard, ErrorCard, ListSkeleton, PageHeader, Section } from '../components';
import { useQuery } from '../io';

const GROUPS: Array<{ key: string; kinds: Asset['kind'][] }> = [
  { key: 'devices', kinds: ['laptop', 'desktop', 'phone', 'tablet', 'monitor', 'peripheral'] },
  { key: 'software', kinds: ['software'] },
  { key: 'access', kinds: ['account'] },
];

export function TechnologyPage() {
  const { t } = useTranslation();
  const assets = useQuery(io => io.assets.list());

  return (
    <Stack gap="32px">
      <PageHeader eyebrow={t('nav.technology')} title={t('technology.title')}>{t('technology.lead')}</PageHeader>
      {assets.loading && !assets.data ? <ListSkeleton rows={4} />
        : assets.error ? <ErrorCard error={assets.error} onRetry={assets.reload} />
        : assets.data!.length === 0 ? <Empty title={t('technology.empty')} />
        : GROUPS.map(group => {
          const items = assets.data!.filter(a => group.kinds.includes(a.kind));
          if (!items.length) return null;
          return (
            <Section key={group.key} title={t(`technology.groups.${group.key}`)}>
              <Grid min="260px">{items.map(asset => <AssetCard key={asset.id} asset={asset} />)}</Grid>
            </Section>
          );
        })}
    </Stack>
  );
}
