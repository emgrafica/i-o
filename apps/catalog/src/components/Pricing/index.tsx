import React from 'react';
import { Box, Typography } from '@lumos/core';
import { CatalogPricingType } from 'gqlTypes/globalTypes';
import StyledSymbol from './index.style';
import { Pricing as SelectedPricing } from 'pages/CatalogItemPage/utils';

/**
 * Props for Pricing component
 */
interface PricingProps {
  pricing: SelectedPricing;
}

/**
 * Render pricing info for catalog model
 * @param pricing - Pricing object from catalogModels query
 */
const Pricing: React.FC<PricingProps> = ({ pricing }) => {
  let content;
  if (pricing.format === CatalogPricingType.Symbols) {
    const MAX_SYMBOL_RANGE = 5;
    const icons = [...Array(MAX_SYMBOL_RANGE)].map((_, i) => {
      const active = i < pricing.value ? 'true' : '';
      const key = `${pricing.value + i}`;
      return <StyledSymbol active={active} key={key} />;
    });
    content = <Box>{icons}</Box>;
  } else {
    content = (
      <Typography
        id="pricing"
        kind="subtitle1"
        fontSize={2}
        color="primary.0"
      >{`$${pricing.value}`}</Typography>
    );
  }
  return content;
};

export default Pricing;
