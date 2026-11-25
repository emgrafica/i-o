import React from 'react';
import { useTranslation } from 'react-i18next';
import { MobilityResolvePlanSku_mobilityResolvePlanSku_sku_features as SkuFeature } from 'graphql/queries/gqlTypes/MobilityResolvePlanSku';
import { Grid, Typography, Form } from '@lumos/core';

/**
 * Props for FeaturesComponent
 */
export interface FeaturesComponentProps {
  features: SkuFeature[];
  selectedFeatures: SkuFeature[];
  // Checkbox change handler
  onChange: (skuFeature: SkuFeature) => void;
}

/**
 * Features component
 */
const FeaturesComponent: React.FC<FeaturesComponentProps> = ({
  features,
  selectedFeatures,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <Grid flexDirection="column" paddingTop="20px">
      <Typography
        kind="h6"
        fontWeight="bold"
        fontSize="18px"
        lineHeight="26px"
        color="primary.0"
      >
        {t('pages:request.mobility.mobilityDetails.features')}
      </Typography>

      {features.map((skuFeature: SkuFeature, key: number) => {
        const checked = !!selectedFeatures.find(
          option => option.id === skuFeature.id,
        );
        return (
          <Form.Item
            key={key}
            inlineLabel
            label={skuFeature.name}
            htmlFor={skuFeature.id}
            padding="0px 0px 8px 0px"
          >
            <Form.Checkbox
              id={skuFeature.id}
              onChange={() => onChange(skuFeature)}
              checked={checked}
            />
          </Form.Item>
        );
      })}
    </Grid>
  );
};

export default FeaturesComponent;
