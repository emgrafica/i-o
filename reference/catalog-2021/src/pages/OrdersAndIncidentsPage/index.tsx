import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  Dispatch,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Box, Grid, SideSheet, Tabs, useToasts } from '@lumos/core';
import queryString from 'query-string';
import OrderViewDetails from 'components/ViewDetails';
import {
  SortOrder,
  DateRange,
  RequestServiceCategoryType,
  RequestStatusType,
} from 'gqlTypes/globalTypes';
import {
  ActionTypes,
  Action,
  IncidentAction,
  IRequestContext,
  OrderAction,
  ResourceType,
} from './types';
import PageTemplate from 'components/PageTemplate';
import Orders from './Orders';
import { useHistory, useLocation } from 'react-router-dom';
import { FilterNode } from 'components/FiltersBox/types';
import { initialState, reducer } from './state-manager';
import Incidents from './Incidents';
import IncidentViewDetails from './Incidents/ViewDetails';
import IncidentViewComments from './Incidents/ViewComments';
import { translateFilterNode } from './utils';
import { PageTabs, PanelContainer, TabsContainer } from './index.style';
import ListPageTemplate from 'components/ListPageTemplate';
import { DATE_RANGE_FILTER_OPTIONS, REQUESTS_SORT } from './queries';
import {
  RequestSort,
  RequestSort_catalogRequestSortFilters,
} from './queries/gqlTypes/RequestSort';
import { TFunction } from 'i18next';
import {
  IncidentDateFilters,
  IncidentDateFilters_incidentDateFilters,
} from './queries/gqlTypes/IncidentDateFilters';
import { RequestType, ReasonForRequest } from 'gqlTypes/globalTypes';
import RequestSection from 'components/ViewDetails/RequestSection';
import ApproverSection from 'components/ViewDetails/ApproverSection';
import ShippingSection from 'components/ViewDetails/ShippingSection';
import ProductReturnSection from 'components/ViewDetails/ProductSection/Return';
import ProductDeploymentSection from 'components/ViewDetails/ProductSection/Deployment';
import { MyRequests_myRequests_items } from 'graphql/queries/gqlTypes/MyRequests';
import { getReasonForRequestI18nKey } from './utils';

const Context = createContext<IRequestContext | null>(null);

// Max incidents per page
export const MAX_ITEMS_PER_PAGE = 20;

// DefaultValue prop for SortBy
const DEFAULT_DATE_RANGE_VALUE = {
  label: 'Last Month',
  value: 'lastMonth',
};

const i18nKeyMapDateRange: { [key: string]: string } = {
  'Last Month': 'common:lastMonth',
  'Last Three Months': 'common:lastThreeMonths',
  'Last Six Months': 'common:lastSixMonths',
  'This Year': 'common:thisYear',
  'Last Year': 'common:lastYear',
};

/**
 * Retrieves sort options and formats it for the DateRangeFilter dropdown
 * @param options
 */
const getDateRangeOptions = (
  t: TFunction,
  options: IncidentDateFilters_incidentDateFilters[],
) => {
  return options.map((option: IncidentDateFilters_incidentDateFilters) => ({
    label: t(i18nKeyMapDateRange[option.rangeValue]),
    value: option.rangeOption,
  }));
};

// DefaultValue prop for SortBy
const DEFAULT_SORT_BY_VALUE = {
  label: 'Newest to Oldest',
  value: 'newestToOldest',
};

// Translation map for sort options
const i18nKeyMap: { [key: string]: string } = {
  'Newest to Oldest': 'common:newestToOldest',
  'Oldest to Newest': 'common:oldestToNewest',
};

/** Retrieves sort options and formats it for the sortBy dropdown */
const getOptions = (
  t: TFunction,
  options: RequestSort_catalogRequestSortFilters[],
) => {
  return options.map((option: RequestSort_catalogRequestSortFilters) => ({
    label: t(i18nKeyMap[option.sortValue]),
    value: option.sortOption,
  }));
};

/**
 * Hook that returns a RequestPage context
 * If null throw
 *
 * @return IRequestContext
 */
export const useRequestContext = (): IRequestContext => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Must be used within the "RequestPage"');
  }
  return context;
};

const productDeploymentSectionProps = (
  orderData: MyRequests_myRequests_items,
  t: TFunction,
) => {
  return {
    replacedDevice:
      orderData.request.type === RequestType.Replace &&
      orderData.existingProduct &&
      `${orderData.existingProduct.name} (Serial ${orderData.existingProduct.id})`,
    trackingDetails: orderData.trackingDetails,
    price:
      orderData.product &&
      'price' in orderData.product &&
      orderData.product.price,
    reasonForRequest:
      orderData.product &&
      orderData.product.type === RequestServiceCategoryType.computer &&
      t(getReasonForRequestI18nKey(orderData.request.reasonForRequest.label)),
    productName: orderData.product && orderData.product.name,
    productType: orderData.product && orderData.product.type,
    operatingSystem:
      orderData.product &&
      'operatingSystem' in orderData.product &&
      orderData.product.operatingSystem,

    keyboard:
      orderData.product &&
      'keyboard' in orderData.product &&
      orderData.product.keyboard,
    plugType:
      orderData.product &&
      'plugType' in orderData.product &&
      orderData.product.plugType,

    deviceUsage:
      orderData.product &&
      'deviceUsage' in orderData.product &&
      orderData.product.deviceUsage,

    justification: orderData.request.justification,
    reasonDetails: orderData.request.reasonDetails,
    isBroken:
      orderData.request.reasonForRequest.value === ReasonForRequest.Broken,
    cancelReason:
      orderData.request.status === RequestStatusType.Cancelled &&
      orderData.request.closingInformation &&
      orderData.request.closingInformation.reason,
    declineReason:
      orderData.request.status === RequestStatusType.Declined &&
      orderData.request.closingInformation &&
      orderData.request.closingInformation.reason,
  };
};

/** Determine order & incident component to render based on the Resource type */
const renderSideSheetContent = (
  /** TFunction for translating side sheet title */
  t: TFunction,
  /** whether rendering side sheet for order or incident*/
  type: ResourceType,
  /** dispatch function to call on close of side sheet */
  dispatch: Dispatch<Action>,
  /** data for order page */
  orderData: MyRequests_myRequests_items | null,
  /** the action the user took */
  action?: OrderAction | IncidentAction,
) => {
  switch (type) {
    case ResourceType.Incidents:
      switch (action) {
        case IncidentAction.ViewDetails:
          return <IncidentViewDetails />;
        case IncidentAction.Comment:
          return <IncidentViewComments />;
        default:
          return null;
      }
    default:
      return (
        orderData && (
          <OrderViewDetails
            title={t('requests:order.requestDetails')}
            sections={[
              <RequestSection {...orderData.request} />,
              orderData.request.type === RequestType.Return ? (
                <ProductReturnSection order={orderData} />
              ) : (
                <ProductDeploymentSection
                  {...productDeploymentSectionProps(orderData, t)}
                />
              ),
              <ApproverSection approvalSection={orderData.approvals} />,
              orderData.request.type !== RequestType.Reassign && (
                <ShippingSection {...orderData.shipping} />
              ),
            ]}
            onClose={() => {
              dispatch({
                type: ActionTypes.SET_ORDER_DATA,
                payload: { orderData: null, orderAction: OrderAction.None },
              });
            }}
          />
        )
      );
  }
};

/**
 * This function prevents from invalid types to enter the active tab state.
 * @param type - unsafe string literal from the query string
 */
const normalizeResourceType = (type: any): ResourceType => {
  return type !== ResourceType.Incidents
    ? ResourceType.Orders
    : ResourceType.Incidents;
};

/** OrdersAndIncidentsPage displays all of a user's requests (opened and closed) */
const OrdersAndIncidentsPage: React.FC = () => {
  const { t } = useTranslation('requests');
  const { data: sortData } = useQuery<RequestSort>(REQUESTS_SORT);
  const { data: dateRangeData } = useQuery<IncidentDateFilters>(
    DATE_RANGE_FILTER_OPTIONS,
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  /** Only rerender when state changes */
  const context = useMemo(
    () => ({
      dispatch,
      state,
    }),
    [state],
  );

  const {
    keywords,
    pageNumber,
    totalItems,
    sortOrder,
    dateRange,
    showCancelIncidentSuccess,
    showCancelOrderFailure,
    showCancelOrderSuccess,
    showReopenIncidentSuccess,
    orderData,
    incidentAction,
    isSideSheetOpen,
    filterState,
    loading,
  } = state;
  filterState.filters.forEach(translateFilterNode);

  const { pathname, search } = useLocation();
  const { type } = queryString.parse(search);
  const [activeTab, setActiveTab] = useState<ResourceType>(
    normalizeResourceType(type),
  );
  const history = useHistory();

  // Determines number of pages for pagination
  const pageCount = Math.ceil(totalItems / MAX_ITEMS_PER_PAGE);

  const setSortOrder = (payload: SortOrder) => {
    dispatch({
      type: ActionTypes.SET_SORT_ORDER,
      payload,
    });
  };

  const setDateRange = (payload: DateRange) => {
    dispatch({
      type: ActionTypes.SET_DATE_RANGE,
      payload,
    });
  };
  const setPageNumber = (payload: number) => {
    dispatch({
      type: ActionTypes.SET_PAGE_NUMBER,
      payload,
    });
  };

  const handleRefine = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.UPDATE_CRITERIA,
      payload: {
        keywords: e.target.value,
      },
    });
  };

  const onFilterChange = (
    filter: FilterNode,
    filterParent: FilterNode | null,
  ) => {
    dispatch({
      type: ActionTypes.UPDATE_FILTER,
      payload: {
        filter,
        filterParent,
      },
    });
  };

  const handleSideSheetClose = () => {
    dispatch({
      type: ActionTypes.CLOSE_SIDE_SHEET,
    });
  };

  const onTabClick = (tabLabel: string) => {
    setPageNumber(1);
    setActiveTab(normalizeResourceType(tabLabel));
  };

  const handleClearFilters = () => {
    dispatch({
      type: ActionTypes.CLEAR_FILTERS,
    });
  };

  /** Update the query string when the tab changes */
  useEffect(() => {
    const params = queryString.stringify({
      type: activeTab,
    });
    history.push(`${pathname}?${params}`);
    // eslint-disable-next-line
  }, [activeTab]);

  const { addToast } = useToasts();

  /** Auxiliary function to show toast notifications*/
  const showToast = (message: string, kind: string) => {
    addToast(message, {
      // Lumos typing issue, will be removed when fixed there
      // @ts-ignore
      kind,
      autoDismiss: true,
    });
    dispatch({
      type: ActionTypes.TOAST_SHOWN,
    });
  };

  // show toast for the cancel incident success
  useEffect(() => {
    if (showCancelIncidentSuccess) {
      showToast(t('cancelIncidentSuccess'), 'success');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCancelIncidentSuccess]);

  // show toast for the reopen incident success
  useEffect(() => {
    if (showReopenIncidentSuccess) {
      showToast(t('reopenModal.incidentSuccess'), 'success');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showReopenIncidentSuccess]);

  // show toast for the cancel order success
  useEffect(() => {
    if (showCancelOrderSuccess && orderData) {
      showToast(
        t('cancelSuccess', {
          requestForUser: `${orderData.request.requestedForUser.firstName} ${orderData.request.requestedForUser.lastName}`,
        }),
        'success',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCancelOrderSuccess, orderData]);

  // show toast for the cancel failure
  useEffect(() => {
    if (showCancelOrderFailure) {
      showToast(t('cancelFailure'), 'danger');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCancelOrderFailure]);

  return (
    <Context.Provider value={context}>
      <PageTemplate hasBanner title={t('title')} subtitle={t('subtitle')}>
        <ListPageTemplate
          loading={loading}
          filtersBoxProps={{
            loading: filterState.loading,
            error: !!filterState.error,
            filters: filterState.filters,
            onFilterChange,
            handleClearFilters,
          }}
          refineProps={{
            refineValue: keywords,
            handleRefineChange: handleRefine,
          }}
          dateRangeProps={
            dateRangeData
              ? {
                  handleSetDateRange: setDateRange,
                  options: getDateRangeOptions(
                    t,
                    dateRangeData.incidentDateFilters,
                  ),
                  defaultDateRangeValue: DEFAULT_DATE_RANGE_VALUE,
                  selectedOption: dateRange
                    ? getDateRangeOptions(
                        t,
                        dateRangeData.incidentDateFilters,
                      ).find(option => option.value === dateRange)
                    : null,
                }
              : undefined
          }
          sortByProps={
            sortData
              ? {
                  handleSetSortBy: setSortOrder,
                  options: getOptions(t, sortData.catalogRequestSortFilters),
                  defaultSortValue: DEFAULT_SORT_BY_VALUE,
                  selectedOption: sortOrder
                    ? getOptions(t, sortData.catalogRequestSortFilters).find(
                        option => option.value === sortOrder,
                      )
                    : null,
                }
              : undefined
          }
          paginationProps={{
            totalHits: totalItems,
            pageCount,
            currentPageNumber: pageNumber,
            maxItemsPerPage: MAX_ITEMS_PER_PAGE,
            handlePaginationClick: setPageNumber,
          }}
        >
          <Grid flexDirection="column" height="100%">
            <Box flex="1 1 auto" maxWidth="780px">
              <PageTabs
                fullWidth
                activeTab={activeTab}
                onClick={onTabClick}
                paddingRight="15px"
              >
                <TabsContainer>
                  <Tabs.Tab label={ResourceType.Orders}>
                    {t('tabOrder')}
                  </Tabs.Tab>
                  <Tabs.Tab label={ResourceType.Incidents}>
                    {t('tabIncident')}
                  </Tabs.Tab>
                </TabsContainer>
                <PanelContainer paddingTop="32px" maxWidth="780px">
                  <Tabs.Panel label={ResourceType.Orders} padding="0px">
                    {/* todo - wrap in React.Lazy. Currently automatically load when page load. */}
                    {activeTab === ResourceType.Orders && (
                      <Orders
                        currentPage={pageNumber}
                        pageSize={MAX_ITEMS_PER_PAGE}
                        sortBy={sortOrder}
                        dateRange={dateRange}
                        keywords={keywords}
                      />
                    )}
                  </Tabs.Panel>
                  <Tabs.Panel label={ResourceType.Incidents} padding="0px">
                    {/* todo - wrap in React.Lazy. Currently automatically load when page load. */}
                    {activeTab === ResourceType.Incidents && (
                      <Incidents
                        currentPage={pageNumber}
                        pageSize={MAX_ITEMS_PER_PAGE}
                        sortBy={sortOrder}
                        dateRange={dateRange}
                        keywords={keywords}
                      />
                    )}
                  </Tabs.Panel>
                </PanelContainer>
              </PageTabs>
            </Box>
          </Grid>
        </ListPageTemplate>

        <SideSheet
          isOpen={isSideSheetOpen}
          onRequestClose={handleSideSheetClose}
        >
          {renderSideSheetContent(
            t,
            activeTab,
            dispatch,
            state.orderData,
            incidentAction,
          )}
        </SideSheet>
      </PageTemplate>
    </Context.Provider>
  );
};

export default OrdersAndIncidentsPage;
