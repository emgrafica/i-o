import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IncidentsForLoggedInUserVariables } from '../../../graphql/queries/gqlTypes/IncidentsForLoggedInUser';
import { QueryWrapperProps, ActionTypes } from '../types';
import { useRequestContext } from '..';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { IncidentFilters } from 'graphql/queries/gqlTypes/IncidentFilters';
import { INCIDENT_FILTERS } from 'graphql/queries/incidentFilters';
import { parseToFilterNodes, getFilters, getSelectedFilters } from '../utils';
import { IncidentStatusFilter } from 'gqlTypes/globalTypes';
import RetryQuery from 'components/RetryQuery';
import QueryWrapper from './QueryWrapper';

export type IncidentFilterVars = Pick<
  IncidentsForLoggedInUserVariables,
  'status'
>;

export const mapStatusToRequestStatus: Record<string, IncidentStatusFilter> = {
  Open: IncidentStatusFilter.open,
  Closed: IncidentStatusFilter.closed,
};

/**
 * Custom filter box props goes here
 */
interface IncidentsProps extends QueryWrapperProps {
  currentPage: number;
  pageSize: number;
}

const Incidents: React.FC<IncidentsProps> = ({
  currentPage,
  pageSize,
  sortBy,
  dateRange,
  keywords = '',
}) => {
  const location = useLocation();

  const [queryError, setQueryError] = useState(false);

  const {
    loading: filtersLoading,
    data: filtersData,
    error: filtersError,
  } = useQuery<IncidentFilters>(INCIDENT_FILTERS);

  const { state, dispatch } = useRequestContext();

  useEffect(() => {
    const query = queryString.parse(location.search);

    if (query.type && query.type === 'incidents') {
      const currentFilters = filtersData
        ? parseToFilterNodes(filtersData.incidentFilters)
        : [];
      dispatch({
        type: ActionTypes.INIT_FILTERS,
        payload: {
          filters: currentFilters,
          loading: filtersLoading,
          error: filtersError,
        },
      });
    }
  }, [dispatch, filtersData, filtersError, filtersLoading, location.search]);

  const filterVars: IncidentFilterVars = {
    status: [],
  };

  for (const f of state.filterState.filters) {
    if (f.filterName === 'Status') {
      filterVars.status = getFilters(f, mapStatusToRequestStatus);
    }
  }

  if (queryError) {
    return <RetryQuery onRetry={() => setQueryError(false)} />;
  }

  return (
    <QueryWrapper
      sortOrder={sortBy}
      dateRange={dateRange}
      refine={keywords}
      {...filterVars}
      pageSize={pageSize}
      currentPage={currentPage}
      withFilters={getSelectedFilters(state.filterState.filters).length > 0}
      onError={() => setQueryError(true)}
    />
  );
};

export default Incidents;
