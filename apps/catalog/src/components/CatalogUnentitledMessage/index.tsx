import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@lumos/core';
import { InfoOutlined, ChevronLeft } from '@material-ui/icons';
import { Trans, useTranslation } from 'react-i18next';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import { HomePath } from 'utils/routes';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import styled from 'styled-components';

const IconWrapper = styled.div`
  font-size: 22px;
  height: 22px;
  margin-top: -2px;
  margin-right: 10px;
`;

const ButtonWrapper = styled.div`
  font-size: 19px;
  height: 19px;
  margin-top: -3px;
  margin-right: 5px;
`;

interface CatalogUnentitledProps {
  /**
   * catalogItemClass to be displayed
   */
  catalogItemClass: CatalogItemClass;
  /**
   * User name to be displayed
   */
  name: string | null;
}

const CatalogUnentitledMessage: React.FC<CatalogUnentitledProps> = ({
  catalogItemClass,
  name,
}) => {
  const { t } = useTranslation('catalog');
  const breakpoint = useBreakpoint();
  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop={{ _: '0px', lg: '95px' }}
    >
      <Box maxWidth={{ xs: '343px', md: '655px', lg: '797px' }}>
        <Grid alignItems="baseline" marginBottom="40px">
          <IconWrapper>
            <InfoOutlined fontSize="inherit" />
          </IconWrapper>
          <Typography
            kind={breakpoint <= Breakpoint.sm ? 'body1' : 'h5'}
            color="secondary.0"
          >
            <Trans t={t} i18nKey="unentitled.noItems">
              There are no
              {catalogItemClass}
              items available for
              {name}
              based on a business configuration rule.
            </Trans>
          </Typography>
        </Grid>
        <Typography
          kind={breakpoint <= Breakpoint.sm ? 'body1' : 'h5'}
          color="secondary.0"
          marginLeft="34px"
          marginBottom="58px"
        >
          {t('unentitled.contact')}
        </Typography>
      </Box>
      <Link to={HomePath}>
        <Button
          kind="secondary"
          fontSize="13px"
          height="34px"
          minWidth="148px"
          padding="8px"
        >
          <Grid>
            <ButtonWrapper>
              <ChevronLeft fontSize="inherit" />
            </ButtonWrapper>
            {t('unentitled.goHome')}
          </Grid>
        </Button>
      </Link>
    </Grid>
  );
};

export default CatalogUnentitledMessage;
