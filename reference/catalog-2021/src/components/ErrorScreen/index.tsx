import React from 'react';
import { Typography } from '@lumos/core';
import { useTranslation } from 'react-i18next';

/**
 * Interface of the props passed to the ErrorScreen component.
 */
interface ErrorScreenProps {
  /**
   * Optional error message to display in the error screen,
   * a default error message is used if no message is provided.
   */
  message?: string;
}

/**
 * Error screen to display error message
 *
 * @param { message } Optional message.
 * A default error message is used if no message is provided.
 */
const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => {
  const { t } = useTranslation();

  return (
    <Typography kind="body1">
      {message || t('pages:error.defaultErrorMessage')}
    </Typography>
  );
};

export default ErrorScreen;
