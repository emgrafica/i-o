import React, { ReactNode } from 'react';
import { Grid, Box } from '@lumos/core';

/**Props for the BaseCheckoutTemplate component*/
export interface BaseCheckoutTemplateProps {
  /**Banner component to display at the top of the page*/
  banner?: ReactNode;
  /**Back button component*/
  backButton?: ReactNode;
  /**Component to display in the Product Details section*/
  productDetails?: ReactNode;
  /**Component to display in the Order Details section*/
  orderDetails?: ReactNode;
  /**Component to display in the Billing section*/
  billing?: ReactNode;
  /**Component to display in the Shipping section*/
  shipping?: ReactNode;
  /**Component to display in the Validation section*/
  validationForm?: ReactNode;
  /**Actions buttons to submit or cancel the form*/
  actionButtons?: ReactNode;
}

/**
 *  Base Checkout Template, handles the general layout of the checkout page
 *  all the subcomponents are passed as props.
 */
const BaseCheckoutTemplate: React.FC<BaseCheckoutTemplateProps> = ({
  banner,
  backButton,
  billing,
  shipping,
  productDetails,
  orderDetails,
  validationForm,
  actionButtons,
}) => {
  return (
    <>
      {banner}
      {backButton}
      <Grid flexWrap="wrap">
        {/* Shipping and Billing */}
        <Box
          flex={1}
          paddingRight={{ xxs: 0, md: '24px' }}
          paddingBottom={{ xxs: '0px', md: '32px' }}
          minWidth={{ xxs: '100%', md: '50%' }}
        >
          {billing}
          {shipping}
        </Box>

        {/* Product and Order Details */}
        <Box
          flex={1}
          paddingRight={{ xs: 0, md: 4 }}
          display="flex"
          flexDirection="column"
          position={{ md: 'relative' }}
          minWidth={{ xxs: '100%', md: '50%' }}
        >
          {productDetails}
          {orderDetails}
          {validationForm}
        </Box>
      </Grid>
      {/* Cancel/Submit Buttons */}
      <Box
        display="flex"
        flex={1}
        justifyContent={{ xxs: 'center', md: 'flex-end', lg: 'flex-end' }}
        flexDirection={{ xxs: 'column-reverse', md: 'row' }}
        paddingRight={{ xs: 0, md: 4 }}
        minWidth="100%"
        paddingTop={{ xxs: '40px' }}
      >
        {actionButtons}
      </Box>
    </>
  );
};

export default BaseCheckoutTemplate;
