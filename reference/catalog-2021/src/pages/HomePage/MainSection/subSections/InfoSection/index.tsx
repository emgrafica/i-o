import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { useTranslation } from 'react-i18next';
import { Box } from '@lumos/core';
import { StyledWhiteBox } from '../../../general.style';
import useDevice, { Device } from 'utils/useDevice';
import { ManageApprovals, ManagePersonalRequestsPath } from 'utils/routes';
import { Col, GridLayout, Row } from 'components/GridLayout';
import {
  IncidentStatusFilter,
  RequestShortStatusType,
} from 'gqlTypes/globalTypes';
import OrderQuickView from '../../OrderQuickView';
import { USER_APPROVALS, USER_ORDERS, USER_INCIDENTS } from 'graphql/queries';
import { UserApprovals } from 'graphql/queries/gqlTypes/UserApprovals';
import { UserOrders } from 'graphql/queries/gqlTypes/UserOrders';
import { UserIncidents } from 'graphql/queries/gqlTypes/UserIncidents';
import {
  useOBOInfoLocalState,
  INCIDENTS_FEATURE_CODE,
  APPROVALS_FEATURE_CODE,
  ORDERS_FEATURE_CODE,
} from 'store/apollo/store/hooks';

const InfoSection: React.FC = () => {
  const device = useDevice();
  const { t } = useTranslation('home');
  const userId = useUserId();
  const oboInfoLocalState = useOBOInfoLocalState();

  const {
    data: approvalsData,
    loading: approvalsLoading,
    error: approvalsError,
  } = useQuery<UserApprovals>(USER_APPROVALS, {
    variables: {
      approverUserId: userId,
    },
  });

  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useQuery<UserOrders>(USER_ORDERS, {
    variables: {
      requestedForUserId: userId,
      requestStatus: [RequestShortStatusType.Open],
    },
  });

  const {
    data: incidentsData,
    loading: incidentsLoading,
    error: incidentsError,
  } = useQuery<UserIncidents>(USER_INCIDENTS, {
    variables: {
      userId,
      status: [IncidentStatusFilter.open],
    },
  });

  return (
    <GridLayout columnGutters={0}>
      <Row>
        <Col
          colspan={{
            xxs: '4',
            xs: '4',
            sm: '12',
            md: '12',
            lg: '12',
            xl: '12',
          }}
        >
          <Box
            marginRight={{ xxs: '5px', sm: 0 }}
            paddingRight={{
              xxs: '0px',
              xs: '0px',
              sm: '0px',
              md: '0px',
              lg: '0px',
              xl: '0px',
              xxl: '0px',
            }}
            paddingLeft={{
              xxs: '0px',
              xs: '0px',
              sm: '12px',
              md: '12px',
              lg: '12px',
              xl: '12px',
              xxl: '12px',
            }}
          >
            <StyledWhiteBox
              height={{ xxs: '106px', sm: '100px' }}
              paddingBottom={{ xxs: '13.5px' }}
            >
              <OrderQuickView
                title={t('approvals.title')}
                statusId="requestsStatus"
                status={t('approvals.status')}
                actionId="viewRequestsAction"
                actionText={t('common:view')}
                countId="requestsCount"
                count={approvalsData ? approvalsData.orderApprovalsCount : 0}
                to={ManageApprovals}
                isLoading={approvalsLoading}
                isError={Boolean(approvalsError)}
                actionDisable={
                  !oboInfoLocalState.hasOBOUserRightFor(APPROVALS_FEATURE_CODE)
                }
              />
            </StyledWhiteBox>
          </Box>
        </Col>

        <Col
          colspan={{
            xxs: '4',
            xs: '4',
            sm: '12',
            md: '12',
            lg: '12',
            xl: '12',
          }}
        >
          <Box
            marginRight={{ xxs: '5px', sm: 0 }}
            paddingRight={{
              xxs: '0px',
              xs: '0px',
              sm: '0px',
              md: '0px',
              lg: '0px',
              xl: '0px',
              xxl: '0px',
            }}
            paddingLeft={{
              xxs: '0px',
              xs: '0px',
              sm: '12px',
              md: '12px',
              lg: '12px',
              xl: '12px',
              xxl: '12px',
            }}
            paddingTop={{
              xxs: 0,
              xs: 0,
              sm: 3,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
          >
            <StyledWhiteBox height={{ xxs: '106px', sm: '100px' }}>
              <OrderQuickView
                title={t('orders.title')}
                statusId="requestsStatus"
                status={t('orders.status')}
                actionId="viewRequestsAction"
                actionText={t('common:view')}
                countId="requestsCount"
                count={
                  ordersData ? ordersData.catalogRequestsByUser.totalHits : 0
                }
                to={`${ManagePersonalRequestsPath}?type=orders`}
                isLoading={ordersLoading}
                isError={Boolean(ordersError)}
                actionDisable={
                  !oboInfoLocalState.hasOBOUserRightFor(ORDERS_FEATURE_CODE)
                }
              />
            </StyledWhiteBox>
          </Box>
        </Col>

        <Col
          marginBottom={device !== Device.Mobile ? '12px' : '0px'}
          colspan={{
            xxs: '4',
            xs: '4',
            sm: '12',
            md: '12',
            lg: '12',
            xl: '12',
          }}
        >
          <Box
            paddingRight={'0px'}
            paddingLeft={{
              xxs: '0px',
              xs: '0px',
              sm: '12px',
              md: '12px',
              lg: '12px',
              xl: '12px',
              xxl: '12px',
            }}
            paddingTop={{
              xxs: 0,
              xs: 0,
              sm: 3,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
          >
            <StyledWhiteBox height={{ xxs: '106px', sm: '100px' }}>
              <OrderQuickView
                title={t('incidents.title')}
                statusId="requestsStatus"
                status={t('incidents.status')}
                actionId="viewRequestsAction"
                actionText={t('common:view')}
                countId="requestsCount"
                count={
                  incidentsData &&
                  incidentsData.incidentsSearch.totalItems !== null
                    ? incidentsData.incidentsSearch.totalItems
                    : 0
                }
                to={`${ManagePersonalRequestsPath}?type=incidents`}
                isLoading={incidentsLoading}
                isError={Boolean(incidentsError)}
                actionDisable={
                  !oboInfoLocalState.hasOBOUserRightFor(INCIDENTS_FEATURE_CODE)
                }
              />
            </StyledWhiteBox>
          </Box>
        </Col>
      </Row>
    </GridLayout>
  );
};

export default InfoSection;
