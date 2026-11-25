import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Typography } from '@lumos/core';
import styled from 'styled-components';

/** Bottom border for filter side sheet  **/
const BottomBorder = styled.div`
  margin: 24px 0px;
  min-height: 1px;
  background-color: ${props => props.theme.colors.secondary[3]};
`;

/** Interface of the props passed to the FilterSideSheet component */
interface FilterSideSheetProps {
  /** Filters to display */
  filters: React.ReactElement;
  /** Optional action to be performed on click of clear filters */
  onClearFilters?: () => void;
  /** Action to be performed on click of apply */
  onApply: () => void;
}

/**
 * Renders a side sheet for filters to keep all the mobile/desktop filters consistent
 */
const FilterSideSheet: React.FC<FilterSideSheetProps> = ({
  filters,
  onClearFilters,
  onApply,
}) => {
  const { t } = useTranslation('common');
  return (
    <Grid flexDirection="column" padding="32px 24px" minHeight="100%">
      <Typography kind="h5">{t('filters')}</Typography>
      {filters}
      <Grid marginTop="auto" flexDirection="column" width="100%">
        <BottomBorder />
        <Grid marginLeft="auto">
          {onClearFilters && (
            <Button kind="text" marginRight="16px" onClick={onClearFilters}>
              {t('clearFilters')}
            </Button>
          )}
          <Button kind="primary" onClick={onApply}>
            {t('apply')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterSideSheet;
