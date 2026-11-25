import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, Grid, Typography } from '@lumos/core';
import telephoneImage from 'assets/images/telephone.png';
import { GComResolveSku_gcomResolveSku_sku as Sku } from 'graphql/queries/gqlTypes/GComResolveSku';

/**
 * Props for SelectedSkuSummary
 */
export interface SelectedSkuSummaryProps {
  selectedProduct: string;
  selectedSku: Sku;
}

/**
 * Selected SKU summary component
 */
const SelectedSkuSummary: React.FC<SelectedSkuSummaryProps> = ({
  selectedProduct,
  selectedSku,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography kind="body1" marginTop="0">
        {t('pages:request.gcom.productSelection.summaryTitle')}
      </Typography>
      <Card minHeight="149px" marginTop="10px" width="90%">
        <Grid alignItems="center" margin="auto">
          <Box padding="30px 50px 30px 50px">
            <img src={telephoneImage} alt="phone icon" width="80px" />
          </Box>
          <Grid flexDirection="column" alignItems="left">
            <Typography kind="subtitle2" marginTop="0">
              {selectedProduct}
            </Typography>
            <Typography kind="body2" marginTop="0">
              {selectedSku.description}
            </Typography>
            <Typography kind="body2" marginTop="35px">
              {selectedSku.sku}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default SelectedSkuSummary;
