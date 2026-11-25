import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Typography } from '@lumos/core';

/**
 * Props for FilterChipsProps
 */
export interface FilterChipsProps {
  /**
   * Method to be executed when Clear Filters button is clicked.
   */
  handleClearFilters: () => void;
}

/**
 * Filter Chips component will render a list of given Chips components
 */
const FilterChips: React.FC<FilterChipsProps> = ({
  children,
  handleClearFilters,
}) => {
  const { t } = useTranslation('requests');
  return (
    <Grid justifyContent="flex-start" alignItems="center">
      <Typography kind="caption" marginRight="6px">
        {t('yourFilters')}
      </Typography>
      {/* TODO: We need to consider how chips are being created on the different pages and find a way to create a standard for all of them and include chips rendering on this component */}
      {children}
      <Button kind="text" marginLeft="16px" onClick={handleClearFilters}>
        {t('clearFilters')}
      </Button>
    </Grid>
  );
};

export default FilterChips;
