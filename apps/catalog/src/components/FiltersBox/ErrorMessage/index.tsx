import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@lumos/core';
import { Refresh } from '@material-ui/icons';
import useBreakpoint from 'utils/useBreakpoint';
import { ErrorIcon, StyledLoadingError, IconWrapper } from './index.style';

/**
 * Props for ErrorMessage
 */
export interface ErrorMessageProps {
  /**
   *  Implement this function to trigger retry
   */
  onRetry: (() => void) | null;
}

/**
 * Display Error Message when PDP query fails
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ onRetry }) => {
  const { t } = useTranslation('catalog');
  const breakpoint = useBreakpoint();

  return (
    <Box textAlign="center">
      <Box
        flexDirection="row"
        alignItems="center"
        display="flex"
        textAlign="center"
        justifyContent="center"
        width="100%"
        marginTop="50px"
      >
        <IconWrapper breakpoint={breakpoint}>
          <ErrorIcon />
        </IconWrapper>
        <StyledLoadingError breakpoint={breakpoint}>
          {t('error.filtersError')}
        </StyledLoadingError>
      </Box>
      {onRetry && (
        <Button
          kind="secondary"
          withIconOnLeft={<Refresh />}
          onClick={onRetry}
          marginTop="12px"
        >
          {t('error.retry')}
        </Button>
      )}
    </Box>
  );
};

export default ErrorMessage;
