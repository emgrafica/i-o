import React from 'react';
import { Grid, Typography } from '@lumos/core';
import { PageviewOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const IconWrapper = styled.div`
  font-size: 72px;
  height: 72px;
  margin-right: 20px;
`;

const NoResultsWithFilters: React.FC = () => {
  const { t } = useTranslation('requests');
  return (
    <Grid justifyContent="center" alignItems="center" marginTop="95px">
      <IconWrapper>
        <PageviewOutlined fontSize="inherit" />
      </IconWrapper>
      <Typography kind="h5" color="secondary.0">
        {t('noResultsWithFilters')}
      </Typography>
    </Grid>
  );
};

export default NoResultsWithFilters;
