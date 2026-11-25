import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@lumos/core';

/** Props type for the DefaulActionButtons component */
export interface DefaultActionButtonsProps {
  /** Whether the buttons are disabled or not*/
  disabled: boolean;
  /** Callback to handle the Cancel button click event*/
  onCancelClick: (isOpen: boolean) => void;
  /** Callback to handle the Submit button click event*/
  onSubmitClick: () => void;
  /** Optional prop to override the default submit button text, the default text is "Submit" */
  submitButtonText?: string;
  /** Optional prop to add an icon to the submit button */
  submitButtonIcon?: JSX.Element;
}

/** Default Action Buttons component for the Checkout pages*/
const DefaultActionButtons: React.FC<DefaultActionButtonsProps> = ({
  disabled,
  onCancelClick,
  onSubmitClick,
  submitButtonText,
  submitButtonIcon,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        data-testid="cancel"
        marginRight={{
          xxs: '16px',
          xs: '16px',
          sm: '16px',
          md: '23px',
          lg: '20px',
          xl: '20px',
          xxl: '20px',
        }}
        width={{ xs: '100%', md: '161px', lg: '135px', xl: 'auto' }}
        kind="secondary"
        type="button"
        onClick={() => {
          onCancelClick(true);
        }}
        disabled={disabled}
      >
        {t('pages:request.checkout.cancelOrder')}
      </Button>
      <Button
        data-testid="submit"
        padding={3}
        width={{ xs: '100%', md: '161px', lg: '135px', xl: 'auto' }}
        marginBottom={{ xs: '10px', md: '0px' }}
        kind="primary"
        type="submit"
        onClick={onSubmitClick}
        fullWidth
        disabled={disabled}
        withIconOnLeft={submitButtonIcon}
      >
        {submitButtonText || t('pages:request.checkout.submitOrder')}
      </Button>
    </>
  );
};

export default DefaultActionButtons;
