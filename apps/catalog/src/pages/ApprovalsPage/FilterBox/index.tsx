import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Grid,
  Typography,
  FilterBox as LumosFilterBox,
} from '@lumos/core';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import ShowFor from 'components/ShowFor';

interface FilterBoxProps {
  onChange: (filterCatalogItemClass: CatalogItemClass) => void;
  filterCatalogItemClass: CatalogItemClass[];
  handleClearFilters: () => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({
  onChange,
  filterCatalogItemClass,
  handleClearFilters,
}) => {
  const { t } = useTranslation('approvals');
  const computersChecked = filterCatalogItemClass.includes(
    CatalogItemClass.computer,
  );
  const accessoriesChecked = filterCatalogItemClass.includes(
    CatalogItemClass.accessory,
  );
  const mobilityChecked = filterCatalogItemClass.includes(
    CatalogItemClass.mobility,
  );

  return (
    <>
      <ShowFor desktopAndLarger>
        <Grid
          marginTop="32px"
          marginBottom="30px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography kind="subtitle3" marginY="14.5px">
            {t('common:filter')}
          </Typography>

          {(computersChecked || accessoriesChecked || mobilityChecked) && (
            <Button kind="secondary" onClick={handleClearFilters}>
              {t('common:clearAll')}
            </Button>
          )}
        </Grid>
      </ShowFor>
      <LumosFilterBox>
        <LumosFilterBox.Category name={t('filterBox.title')}>
          <LumosFilterBox.Item
            name={t('filterBox.accessories')}
            checked={accessoriesChecked}
            onChange={() => {
              onChange(CatalogItemClass.accessory);
            }}
          />
          <LumosFilterBox.Item
            name={t('filterBox.computers')}
            checked={computersChecked}
            onChange={() => {
              onChange(CatalogItemClass.computer);
            }}
          />
          <LumosFilterBox.Item
            name={t('filterBox.mobility')}
            checked={mobilityChecked}
            onChange={() => {
              onChange(CatalogItemClass.mobility);
            }}
          />
        </LumosFilterBox.Category>
      </LumosFilterBox>
    </>
  );
};

export default FilterBox;
