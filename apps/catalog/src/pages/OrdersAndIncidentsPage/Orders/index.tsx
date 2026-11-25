import { ActionTypes, QueryWrapperProps } from '../types';
import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { ORDER_FILTERS } from '../../../graphql/queries';
import {
  CatalogItemClass,
  RequestedForType,
  RequestShortStatusType,
  SortOrder,
  DateRange,
} from '../../../gqlTypes/globalTypes';
import { useRequestContext } from '..';
import { getFilters, getSelectedFilters, parseToFilterNodes } from '../utils';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { MyRequestsVariables } from 'graphql/queries/gqlTypes/MyRequests';
import { OrderFilters } from 'graphql/queries/gqlTypes/OrderFilters';
import QueryWrapper from './QueryWrapper';
import RetryQuery from 'components/RetryQuery';

export type FilterVars = Pick<
  MyRequestsVariables,
  'categories' | 'requestedFor' | 'requestStatus'
>;

export const mapCategoriesToCatalogItemClass: Record<
  string,
  CatalogItemClass
> = {
  Accessory: CatalogItemClass.accessory,
  Computer: CatalogItemClass.computer,
  Mobility: CatalogItemClass.mobility,
};

export const mapStatusToRequestStatus: Record<
  string,
  RequestShortStatusType
> = {
  Open: RequestShortStatusType.Open,
  Closed: RequestShortStatusType.Closed,
};

export const mapRequestedFor: Record<string, RequestedForType> = {
  Myself: RequestedForType.Myself,
  Other: RequestedForType.Other,
};

/**
 * Custom filter box props goes here
 */
export interface OrdersProps extends QueryWrapperProps {
  currentPage: number;
  pageSize: number;
}

const Orders: React.FC<OrdersProps> = ({
  currentPage,
  pageSize,
  keywords = '',
  sortBy = SortOrder.Newest,
  dateRange = DateRange.lastMonth,
}) => {
  const location = useLocation();
  const { state, dispatch } = useRequestContext();
  const [queryError, setQueryError] = useState(false);

  const {
    loading: filtersLoading,
    data: filtersData,
    error: filtersError,
  } = useQuery<OrderFilters>(ORDER_FILTERS);

  useEffect(() => {
    const query = queryString.parse(location.search);

    if (query.type && query.type === 'orders') {
      const currentFilters = filtersData
        ? parseToFilterNodes(filtersData.catalogRequestFilters)
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
  }, [filtersData, dispatch, filtersError, filtersLoading, location.search]);

  const { filterState } = state;

  const filterVars: FilterVars = {
    categories: [],
    requestedFor: [],
    requestStatus: [],
  };

  for (const f of filterState.filters) {
    if (f.filterName === 'Category') {
      filterVars.categories = getFilters(f, mapCategoriesToCatalogItemClass);
    }
    if (f.filterName === 'Status') {
      filterVars.requestStatus = getFilters(f, mapStatusToRequestStatus);
    }
    if (f.filterName === 'Requested For') {
      filterVars.requestedFor = getFilters(f, mapRequestedFor);
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
      pageNumber={currentPage}
      pageSize={pageSize}
      withFilters={getSelectedFilters(filterState.filters).length > 0}
      onError={() => setQueryError(true)}
    />
  );
};

export default Orders;
