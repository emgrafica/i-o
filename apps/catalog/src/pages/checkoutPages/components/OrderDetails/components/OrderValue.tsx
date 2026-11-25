import React from 'react';
import { Typography } from '@lumos/core';
import { Col, Row } from 'components/GridLayout';

export interface OrderValueProps {
  /**
   * Order detail label
   */
  label?: string;
  /**
   * Order detail value
   */
  value?: string | null;
}
/**
 *  Checkout Order Details Value
 */
const OrderValue: React.FC<OrderValueProps> = ({ label, value }) => {
  if (value) {
    return (
      <Row
        flexDirection={{
          xxs: 'column',
          xs: 'column',
          sm: 'column',
          md: 'column',
          lg: 'row',
          lx: 'row',
          xxl: 'row',
        }}
      >
        <Col colspan={{ _: '4' }}>
          <Typography
            kind="body2"
            fontWeight="bold"
            color="primary.0"
            marginBottom="0px"
          >
            {label}
          </Typography>
        </Col>
        <Col colspan={{ _: '8' }}>
          <Typography
            kind="body2"
            color="primary.0"
            marginBottom={{ xxs: '12px', md: '12px' }}
            marginTop={{
              xxs: '0px',
              xs: '0px',
              sm: '0px',
              md: '0px',
              lg: '12px',
              xl: '12px',
              xxl: '12px',
            }}
          >
            {value}
          </Typography>
        </Col>
      </Row>
    );
  }
  return null;
};

export default OrderValue;
