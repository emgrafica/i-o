import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, Box } from '@lumos/core';
import { GridLayout } from 'components/GridLayout';
import SpecificationValue from './SpecificationValue';

interface ModelSpecificationsProps {
  /**
   * Specifications to be displayed
   */
  specifications: {
    label: string;
    value: string | null;
  }[];
}

/**
 * Model Specifications
 */
const ModelSpecifications: React.FC<ModelSpecificationsProps> = ({
  specifications,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      marginTop={{ xxs: 0, md: 5 }}
      paddingTop={{ xxs: 0, md: 5 }}
      marginLeft={0}
    >
      <Typography kind="h5" color="primary.2" marginTop={0} marginBottom={15}>
        {t('requests:order.modelSpecifications')}
      </Typography>
      <Grid margin={{ xs: 0, sm: 1 }}>
        <GridLayout columnGutters={0}>
          {specifications.map((specification, index) => (
            <SpecificationValue
              key={`model-specifications-${specification.label}-${index}`}
              label={specification.label}
              value={specification.value}
            />
          ))}
        </GridLayout>
      </Grid>
    </Box>
  );
};

export default ModelSpecifications;
