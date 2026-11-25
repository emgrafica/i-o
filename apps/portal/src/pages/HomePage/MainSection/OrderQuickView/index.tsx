import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@lumos/core';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import {
  StyledTitle,
  StyledStats,
  StyledStatus,
  StyledActionLink,
  StyledActionLinkDisabled,
} from 'components/ActionItemCard/index.style';
import useDevice from 'utils/useDevice';
import LoadingError from '../../components/LoadingError';

// Constants to set height for text skeletons
const TEXT_SKELETON_DEFAULT_HEIGHT = 16;

export interface OrderQuickViewProps {
  /**
   * Title of order type
   */
  title: string;
  /**
   * Count id
   */
  countId?: string;
  count: number;
  /**
   * Status id
   */
  statusId?: string;
  /**
   * Status of orders
   */
  status: string;
  /**
   * Helper text to describe orders
   */
  subtitle?: string;
  /**
   * Text that describes available action
   */
  actionText: string;
  /**
   * Action link id
   */
  actionId?: string;
  /**
   * Path that is navigated to when action button is clicked.
   */
  to: string;
  /**
   * Loading status
   */
  isLoading: boolean;
  /**
   * Error status
   */
  isError: boolean;
  /**
   * Disable Action when user is OBO
   */
  actionDisable: boolean;
}

/**
 * Quick card view of various order types, i.e. Requests, Approvals, etc.
 */
const OrderQuickView: React.FC<OrderQuickViewProps> = ({
  title,
  count,
  countId,
  status,
  statusId,
  subtitle,
  actionText,
  actionId,
  to,
  isLoading,
  isError,
  actionDisable,
}) => {
  const { t } = useTranslation();
  const device = useDevice();
  const shouldShowLink = window.innerWidth >= 768;

  return (
    <>
      {isLoading ? (
        <Box
          padding={{
            xs: '30px 10px 30px',
            sm: '30px',
          }}
        >
          <Skeleton
            height={TEXT_SKELETON_DEFAULT_HEIGHT}
            style={{ marginBottom: '8px' }}
          />
          <Skeleton height={TEXT_SKELETON_DEFAULT_HEIGHT} width="85%" />
        </Box>
      ) : (
        <Grid
          flexDirection={{ xxs: 'column', sm: 'row' }}
          justifyContent={{ sm: 'space-around' }}
          alignItems={{ sm: 'center' }}
          paddingTop={{ xxs: 0, sm: '10.5px' }}
          paddingBottom={{ xxs: 0, sm: '13.5px' }}
          paddingLeft={{ xxs: '15px', md: '20px' }}
          paddingRight={{ xxs: '15px' }}
        >
          {!isError ? (
            <Grid
              flexBasis="30%"
              flexDirection={{ xxs: 'column' }}
              justifyContent={{ xxs: 'flex-start' }}
              textAlign={{ sm: 'start' }}
              flex="1 0 auto"
            >
              <StyledStats
                id={countId}
                marginTop={0}
                marginBottom={0}
                fontSize={{ xxs: 7, sm: 8 }}
              >
                {count}
              </StyledStats>
              <StyledStatus
                id={statusId}
                marginTop={0}
                marginBottom={0}
                fontSize={{ xxs: 0, md: 1 }}
              >
                {status}
              </StyledStatus>
            </Grid>
          ) : null}

          <Box flexBasis="30%" flex="1 0 auto">
            <StyledTitle
              device={device}
              marginTop={0}
              marginBottom={0}
              marginLeft={{ xs: 0 }}
              fontSize={{ xxs: 0, sm: 5 }}
            >
              {title}
            </StyledTitle>
            {isError ? (
              <LoadingError
                errorMessage={t('home:error.loadingError')}
                displayIcon
              />
            ) : null}
          </Box>
          {shouldShowLink && (
            <Box flexBasis="30%" textAlign="right" flex="1 1 auto">
              {actionDisable ? (
                <StyledActionLinkDisabled
                  id={actionId}
                  disabled={actionDisable}
                >
                  {actionText}
                </StyledActionLinkDisabled>
              ) : (
                <Link to={to}>
                  <StyledActionLink id={actionId}>
                    {actionText}
                  </StyledActionLink>
                </Link>
              )}
            </Box>
          )}
        </Grid>
      )}
    </>
  );
};

export default OrderQuickView;
