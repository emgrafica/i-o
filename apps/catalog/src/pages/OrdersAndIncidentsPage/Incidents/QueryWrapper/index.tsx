import { IncidentFilterVars } from '../index';
import { DateRange, SortOrder } from 'gqlTypes/globalTypes';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DescriptionOutlined } from '@material-ui/icons';
import { useQuery } from '@apollo/react-hooks';
import {
  IncidentsForLoggedInUser,
  IncidentsForLoggedInUserVariables,
} from 'graphql/queries/gqlTypes/IncidentsForLoggedInUser';
import { INCIDENTS_FOR_LOGGED_IN_USER } from 'graphql/queries/incidents';
import WideCardListSkeleton from 'components/WideCardListSkeleton';
import IncidentCardList from '../IncidentCardList';
import NoResultsWithFilters from 'components/NoResultsWithFilters';
import NoResultsMessage from 'components/NoResultsMessage';
import { ActionTypes } from 'pages/OrdersAndIncidentsPage/types';
import { useRequestContext } from 'pages/OrdersAndIncidentsPage';

interface IncidentQueryWrapperProps extends IncidentFilterVars {
  sortOrder?: SortOrder;
  dateRange?: DateRange;
  refine: string;
  pageSize: number;
  currentPage: number;
  withFilters: boolean;
  onError: () => void;
}

const QueryWrapper: React.FC<IncidentQueryWrapperProps> = ({
  sortOrder,
  dateRange,
  refine,
  pageSize,
  currentPage,
  status,
  withFilters,
  onError,
}) => {
  const { t } = useTranslation('requests');
  const { dispatch } = useRequestContext();
  const { loading, error, data } = useQuery<
    IncidentsForLoggedInUser,
    IncidentsForLoggedInUserVariables
  >(INCIDENTS_FOR_LOGGED_IN_USER, {
    variables: {
      status,
      sortOrder,
      dateRange,
      refine,
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
        payload: data.incidentsSearch.items.length,
      });
      dispatch({
        type: ActionTypes.SET_LOADING,
        payload: false,
      });
    },
  });

  useEffect(() => {
    if (loading) {
      dispatch({
        type: ActionTypes.SET_LOADING,
        payload: true,
      });
    }
  }, [loading, dispatch]);

  if (loading) {
    return <WideCardListSkeleton />;
  }

  if (error) {
    return null;
  }

  if (data && data.incidentsSearch.items.length > 0) {
    const lowerPageBound = (currentPage - 1) * pageSize;
    const upperPageBound = lowerPageBound + pageSize;
    return (
      <IncidentCardList
        items={data.incidentsSearch.items.slice(lowerPageBound, upperPageBound)}
      />
    );
  }
  if (withFilters) {
    return <NoResultsWithFilters />;
  }
  return (
    <NoResultsMessage
      message={t('incident.noResults')}
      icon={<DescriptionOutlined />}
    />
  );
};

export default QueryWrapper;
