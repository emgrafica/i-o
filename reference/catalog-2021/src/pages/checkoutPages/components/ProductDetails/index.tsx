import React from 'react';
import { Grid, Box, Typography } from '@lumos/core';
import { IBoxProps } from '@lumos/core/lib/components/Box';
import noImage from 'assets/images/noimage_computer.png';
import { GridLayout } from 'components/GridLayout';
import OrderValue from '../OrderDetails/components/OrderValue';
import SectionHeader from 'components/SectionHeader';
import { useTranslation } from 'react-i18next';
import { SPECIAL_REQUEST_SKU } from 'pages/CatalogCommunicationsPage/utils';

export type ProductDetailsProps = IBoxProps & {
  catalogItemImage?: string | null;
  catalogItemName?: string;
  description?: string | null;
  productMessage?: string;
  productSku?: string;
  details?: {
    label: string;
    value?: string | null;
  }[];
};
/**
 *  Checkout Product Section container
 */
const ProductDetails: React.FC<ProductDetailsProps> = ({
  catalogItemImage,
  catalogItemName,
  description,
  productMessage,
  details,
  productSku,
}) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = React.useState(false);
  const imageSrc = imageError ? noImage : catalogItemImage || noImage;
  const showSku = productSku && productSku !== SPECIAL_REQUEST_SKU;
  return (
    <>
      <SectionHeader title={t('common:orderDetails')} />
      <Box>
        <Grid
          flexDirection={{
            xxs: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
            xxl: 'row',
          }}
        >
          <Box
            margin={3}
            padding={0}
            alignSelf={{ xxs: 'center', md: 'baseline' }}
          >
            <img
              height="auto"
              width="130px"
              src={imageSrc}
              alt={catalogItemName}
              onError={() => {
                setImageError(true);
              }}
            />
          </Box>
          <Box minWidth={{ xxs: '100%', md: '50%' }}>
            <Typography kind="body1" color="primary.0" fontWeight="bold">
              {catalogItemName}
            </Typography>
            {description ? (
              <Typography marginBottom={5} kind="body2" color="primary.0">
                {description}
              </Typography>
            ) : null}
            {showSku ? <OrderValue label="SKU" value={productSku} /> : null}
            {productMessage ? (
              <Typography kind="body1" color="primary.0">
                {productMessage}
              </Typography>
            ) : null}
          </Box>
        </Grid>
        <Grid
          flexWrap="wrap"
          marginLeft={{
            xxs: '0px',
            xs: '0px',
            sm: '0px',
            md: '4px',
            lg: '3px',
            xl: '3px',
            xxl: '3px',
          }}
        >
          <GridLayout columnGutters={0}>
            {details &&
              details.map((detail, index) => (
                <OrderValue
                  key={`product-details-${detail.label}-${index}`}
                  label={detail.label}
                  value={detail.value}
                />
              ))}
          </GridLayout>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetails;
