import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@lumos/core';
import { Refresh } from '@material-ui/icons';
import useBreakpoint from 'utils/useBreakpoint';
import { ErrorIcon, StyledLoadingError, IconWrapper } from './index.style';
import BackButton from 'components/BackButton';

/**
 * Props for ErrorMessage
 */
export interface ErrorMessageProps {
  /**
   *  Implement this function to trigger retry
   */
  onRetry: () => void;

  /**
   * path when Back is clicked
   */
  backButtonPath: string;
}

/**
 * Display Error Message when PDP query fails
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  onRetry,
  backButtonPath,
}) => {
  const { t } = useTranslation('requests');
  const breakpoint = useBreakpoint();

  return (
    <Box textAlign="center">
      <BackButton
        text={t('common:backToCatalog')}
        to={{ pathname: backButtonPath, state: { force: true } }}
      />
      <Box
        flexDirection="row"
        alignItems="center"
        display="flex"
        textAlign="center"
        justifyContent="center"
        width="100%"
      >
        <IconWrapper breakpoint={breakpoint}>
          <ErrorIcon />
        </IconWrapper>
        <StyledLoadingError breakpoint={breakpoint}>
          {t('productDetails.error.message')}
        </StyledLoadingError>
      </Box>
      <Button
        kind="secondary"
        withIconOnLeft={<Refresh />}
        onClick={onRetry}
        marginTop="40px"
      >
        {t('productDetails.error.retry')}
      </Button>
    </Box>
  );
};

export default ErrorMessage;
