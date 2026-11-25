import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, FilterBox, Grid, Typography } from '@lumos/core';
import { createFilter } from './utils';
import { FilterNode, FiltersBoxProps } from './types';
import ErrorMessage from './ErrorMessage';
import SkeletonLoader from './SkeletonLoader';
import ShowFor from 'components/ShowFor';

/** Function to determine whether any filters are checked */
const areFiltersChecked = (filterList: FilterNode[] | null) => {
  if (!filterList) return false;

  for (const filter of filterList)
    if (filter.isChecked || areFiltersChecked(filter.children)) return true;
  return false;
};

/**
 * FiltersBox will render tree of filter nodes and notify any selection change
 *
 * @param loading Display loading icon
 * @param error Display error message
 * @param filters Tree of FilterNode items
 * @param refetch Function to refetch items
 * @param onFilterChange Function to notify if a filter selection changed
 * @param width Optional Width for FilterBox
 * @param handleClearFilters Optional function to clear all filters
 *
 */
const FiltersBox: React.FC<FiltersBoxProps> = ({
  loading,
  error,
  filters,
  refetch,
  onFilterChange,
  width,
  handleClearFilters,
}) => {
  const { t } = useTranslation('common');

  const showClearAllButton = areFiltersChecked(filters);

  return (
    <Box>
      {/* <ShowFor desktopAndLarger>
        <Grid
          marginTop="32px"
          marginBottom="30px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography kind="subtitle3" marginY="14.5px">
            {t('filter')}
          </Typography>

          {handleClearFilters && showClearAllButton && (
            <Button kind="secondary" onClick={handleClearFilters}>
              {t('clearAll')}
            </Button>
          )}
        </Grid>
      </ShowFor> */}
      <Box>
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <ErrorMessage onRetry={refetch ? () => refetch() : null} />
        ) : (
          <FilterBox width={width ? width : '202px'}>
            {filters &&
              filters.map((filter: FilterNode) => {
                return createFilter(
                  filter,
                  null,
                  filter.filterName,
                  onFilterChange,
                );
              })}
          </FilterBox>
        )}
      </Box>
    </Box>
  );
};

export default FiltersBox;
