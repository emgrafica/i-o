import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box, Grid, Typography } from '@lumos/core';

/** Props for ViewDetails side sheet */
interface ViewDetailsProps {
  /** Title to display in side sheet */
  title: string;
  /** An array of ReactNodes to display in a sectioned grey box */
  sections?: ReactNode[];
  /** Callback for on close of side sheet */
  onClose: () => void;
}
/**
 * Renders the viewDetails sideSheet to display additional information on a requested asset
 * @param props
 */
const ViewDetails: React.FC<ViewDetailsProps> = ({
  title,
  sections,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Grid
      flexDirection="column"
      marginTop="60px"
      paddingX="24px"
      data-testid="sidesheet"
    >
      <Typography kind="h5" color="state.enabled" marginBottom="32px">
        {title}
      </Typography>
      {sections &&
        sections.map(
          (section, index) =>
            section && (
              <Box
                key={index}
                marginBottom="20px"
                padding="8px"
                backgroundColor="grayScale.1"
              >
                {section}
              </Box>
            ),
        )}
      <Button kind="primary" marginLeft="auto" marginY="20px" onClick={onClose}>
        {t('common:close')}
      </Button>
    </Grid>
  );
};

export default ViewDetails;
