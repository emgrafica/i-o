import { FilterVars } from '../index';
import { useQuery } from '@apollo/react-hooks';
import { SortOrder, DateRange } from 'gqlTypes/globalTypes';
import {
  MyRequests,
  MyRequestsVariables,
} from 'graphql/queries/gqlTypes/MyRequests';
import { MY_REQUESTS } from 'graphql/queries';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DescriptionOutlined } from '@material-ui/icons';
import WideCardListSkeleton from 'components/WideCardListSkeleton';
import OrderList from '../OrderList';
import NoResultsWithFilters from 'components/NoResultsWithFilters';
import NoResultsMessage from 'components/NoResultsMessage';
import { ActionTypes } from 'pages/OrdersAndIncidentsPage/types';
import { useRequestContext } from 'pages/OrdersAndIncidentsPage';

interface OrderQueryWrapperProps extends FilterVars {
  sortOrder: SortOrder;
  dateRange: DateRange;
  refine: string;
  pageNumber: number;
  pageSize: number;
  withFilters: boolean;
  onError: () => void;
}

const QueryWrapper: React.FC<OrderQueryWrapperProps> = ({
  sortOrder,
  dateRange,
  refine,
  pageNumber,
  pageSize,
  categories,
  requestedFor,
  requestStatus,
  withFilters,
  onError,
}) => {
  const { t } = useTranslation('requests');
  const { dispatch } = useRequestContext();
  const { loading, error, data } = useQuery<MyRequests, MyRequestsVariables>(
    MY_REQUESTS,
    {
      variables: {
        sortOrder,
        dateRange,
        refine,
        pageNumber,
        pageSize,
        categories,
        requestedFor,
        requestStatus,
      },
      fetchPolicy: 'cache-and-network',
      onError: () => {
        dispatch({
          type: ActionTypes.SET_TOTAL_ITEMS,
          payload: 0,
        });
        dispatch({
          type: ActionTypes.SET_LOADING,
          payload: false,
        });
        onError();
      },
      onCompleted: data => {
        dispatch({
          type: ActionTypes.SET_TOTAL_ITEMS,
          payload: data.myRequests.totalHits,
        });
        dispatch({
          type: ActionTypes.SET_LOADING,
          payload: false,
        });
      },
    },
  );

  useEffect(() => {
    if (loading) {
      dispatch({
        type: ActionTypes.SET_LOADING,
        payload: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, dispatch]);

  if (loading) {
    return <WideCardListSkeleton />;
  }

  if (error) {
    return null;
  }
  // Only show the list when there is any match.
  if (data && (data.myRequests.totalHits || 0) > 0) {
    return <OrderList items={data.myRequests.items} />;
  }
  //  Show fallback message when there is no match.
  if (withFilters) {
    return <NoResultsWithFilters />;
  }
  return (
    <NoResultsMessage
      message={t('order.noResults')}
      icon={<DescriptionOutlined />}
    />
  );
};

export default QueryWrapper;
