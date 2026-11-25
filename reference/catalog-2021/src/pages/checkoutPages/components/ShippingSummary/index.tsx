import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Typography } from '@lumos/core';
import { Col, GridLayout, Row } from 'components/GridLayout';
import { ShippingFormDataProps } from 'components/ShippingForm/types';

/**
 *  Checkout Shipping Summary Details Section container
 */
const ShippingSummary: React.FC<ShippingFormDataProps> = props => {
  // Translations
  const { t } = useTranslation();

  const {
    name,
    company,
    phone,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    additionalDeliveryInfo,
  } = props;

  const userShippingInfo = {
    name,
    company,
    phone,
    address1,
    address2,
    city,
    state,
    zip,
    country,
  };

  // Renders shippingInfo details only if they are available to show, i.e. the product is deliverable
  const userShippingDetails = Object.values(userShippingInfo).map(
    shippingDetail =>
      shippingDetail && (
        <Typography kind="body2" color="primary.1" key={`${shippingDetail}`}>
          {shippingDetail}
        </Typography>
      ),
  );
  return (
    <Box
      marginTop={{ xxs: 0, md: 5 }}
      paddingTop={{ xxs: 0, md: 5 }}
      borderTop={'thin solid'}
      borderTopColor="primary.0"
    >
      <Grid margin={1}>
        <GridLayout columnGutters={0}>
          <Row>
            <Col colspan={{ _: '4' }}>
              <Typography kind="body2" fontWeight="bold" color="primary.1">
                {t('common:shippingDetails')}
              </Typography>
            </Col>
            <Col colspan={{ _: '8' }}>
              <Box margin={0} padding={0} flex={2}>
                {userShippingDetails}
              </Box>
            </Col>
          </Row>
          {additionalDeliveryInfo && (
            <Row>
              <Col colspan={{ _: '4' }}>
                <Typography kind="body2" fontWeight="bold" color="primary.1">
                  {t('common:deliveryInstructions')}
                </Typography>
              </Col>
              <Col colspan={{ _: '8' }}>
                <Typography kind="body2" color="primary.1">
                  {additionalDeliveryInfo}
                </Typography>
              </Col>
            </Row>
          )}
        </GridLayout>
      </Grid>
    </Box>
  );
};

export default ShippingSummary;
