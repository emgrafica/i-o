import React from 'react';
import { Box, Button } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import useBreakpoint from 'utils/useBreakpoint';
import {
  ErrorIcon,
  StyledLoadingError,
} from 'components/ActionItemCard/index.style';

/**
 * LoadingErrorProps interface for loading errors
 */
export interface LoadingErrorProps {
  errorMessage: string;
  displayIcon?: boolean;
  retryFunction?: () => void;
}

/**
 * Error message for card view of various order types, i.e. Requests, Approvals, etc.
 */
const LoadingError: React.FC<LoadingErrorProps> = ({
  errorMessage,
  displayIcon,
  retryFunction,
}) => {
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  return (
    <Box flexDirection="row" alignItems="center" display="flex">
      {displayIcon && <ErrorIcon />}
      <StyledLoadingError breakpoint={breakpoint}>
        {errorMessage}
      </StyledLoadingError>
      {retryFunction && (
        <Button kind="text" onClick={retryFunction}>
          {t('home:error.retry')}
        </Button>
      )}
    </Box>
  );
};

export default LoadingError;
