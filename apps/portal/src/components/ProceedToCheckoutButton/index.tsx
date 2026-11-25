import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Button } from '@lumos/core';

interface ProceedToCheckoutButtonProps {
  /**
   * Click handler for ProceedToCheckoutButton
   */
  onClick: () => void;
  /**
   * Determines if the button is disabled
   */
  isDisabled: boolean;
}

/**
 * Button used in catalog detail pages
 * Used to navigate users to checkout page
 * @param props
 */
const ProceedToCheckoutButton: React.FC<ProceedToCheckoutButtonProps> = props => {
  const { t } = useTranslation();
  return (
    <Grid
      justifyContent={{
        xs: 'center',
        sm: 'center',
        md: 'flex-end',
        lg: 'flex-end',
      }}
      marginTop={3}
    >
      <Button
        kind="primary"
        onClick={props.onClick}
        disabled={props.isDisabled}
      >
        {t('common:proceedToCheckout')}
      </Button>
    </Grid>
  );
};

export default ProceedToCheckoutButton;
