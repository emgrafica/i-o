import { Box } from '@lumos/core';
import { Col, GridLayout, Row } from 'components/GridLayout';
import React, { ReactElement } from 'react';
import ConfirmationPageTemplate, {
  ConfirmationPageTemplateProps,
} from '../ConfirmationPageTemplate';

/** Props for CheckoutConfirmationPage*/
export interface CheckoutConfirmationPageTemplateProps
  extends ConfirmationPageTemplateProps {
  /** Order summary section of the page, here a summary of the order is displayed*/
  orderSummary?: ReactElement;
  /** Survey to collect user feedback*/
  survey?: ReactElement;
}

/** Template for the Checkout confirmation pages*/
const CheckoutConfirmationPageTemplate: React.FC<CheckoutConfirmationPageTemplateProps> = ({
  title,
  subtitle,
  alertMessage,
  orderSummary,
  survey,
}) => {
  return (
    <ConfirmationPageTemplate {...{ title, subtitle, alertMessage }}>
      <GridLayout columnGutters={0}>
        <Row>
          <Col colspan={{ xs: '12', md: '6', lg: '6' }}>
            <Box paddingRight={{ xs: '0px', md: '12px', lg: '0px' }}>
              {orderSummary}
            </Box>
          </Col>

          <Col colspan={{ xs: '0', lg: '1' }} />
          <Col colspan={{ xs: '12', md: '6', lg: '5' }}>
            <Box paddingLeft={{ xs: '0px', md: '12px', lg: '0px' }}>
              {survey}
            </Box>
          </Col>
        </Row>
      </GridLayout>
    </ConfirmationPageTemplate>
  );
};

export default CheckoutConfirmationPageTemplate;
