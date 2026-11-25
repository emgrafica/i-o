import { Alert, Box, Grid } from '@lumos/core';
import { PageTemplate } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';

/** Props for ConfirmationPageTemplate */
export interface ConfirmationPageTemplateProps {
  /** Title of the page and HTML title  */
  title: string;
  /** Subtitle of the page */
  subtitle: string;
  /** Message to display to the user in the alert */
  alertMessage: string;
}

/**
 * Template page for confirmation pages. These are pages that are shown to the user after
 * a form is submitted, to confirm the given action was completed either successfully or unsuccessfully.
 */
const ConfirmationPageTemplate: React.FC<ConfirmationPageTemplateProps> = ({
  title,
  subtitle,
  alertMessage,
  children,
}) => {
  const { t } = useTranslation('incidentCreated');
  return (
    <PageTemplate hasBanner title={title} subtitle={subtitle}>
      <Grid flexWrap="wrap">
        <Box width="100%">
          <Alert
            message={alertMessage}
            kind="success"
            fullWidth
            closeable
            closeButtonAriaLabel={t('common:close')}
          />
          {children}
        </Box>
      </Grid>
    </PageTemplate>
  );
};

export default ConfirmationPageTemplate;
