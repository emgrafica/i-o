import React from 'react';
import { Grid, Box } from '@lumos/core';
import { IBoxProps } from '@lumos/core/lib/components/Box';
import { GridLayout } from 'components/GridLayout';
import OrderValue from './components/OrderValue';

export type OrderDetailsProps = IBoxProps & {
  /**
   * Array of every Item detail to be displayed under the Label-Value format
   */
  details: {
    label: string;
    value?: string | null;
  }[];
};
/**
 *  Checkout Order Details Section container
 */
const OrderDetails: React.FC<OrderDetailsProps> = ({ details }) => {
  return (
    <Box
      marginTop={{ xxs: 0, md: 5 }}
      paddingTop={{ xxs: 0, md: 5 }}
      borderTop={'thin solid'}
      borderTopColor="primary.0"
      marginLeft={0}
    >
      <Grid margin={{ xs: 0, sm: 1 }}>
        <GridLayout columnGutters={0}>
          {details.map((detail, index) => (
            <OrderValue
              key={`order-details-${detail.label}-${index}`}
              label={detail.label}
              value={detail.value}
            />
          ))}
        </GridLayout>
      </Grid>
    </Box>
  );
};

export default OrderDetails;
