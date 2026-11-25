import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Pagination, SideSheet } from '@lumos/core';
import PageTemplate from 'components/PageTemplate';
import ErrorScreen from 'components/ErrorScreen';
import Refine from 'components/Refine';
import { useDebounce } from 'utils/useDebounce';
import { MY_APPROVALS } from '../../graphql/queries/orderApprovals';
import {
  ApproverState,
  CatalogItemClass,
  OrderApprovalsSearchSortBy,
  OrderApprovalsSearchSortDirection,
} from 'gqlTypes/globalTypes';
import {
  MyApprovals,
  MyApprovalsVariables,
} from 'graphql/queries/gqlTypes/MyApprovals';
import ApprovalsList from './ApprovalsList';
import FilterBox from './FilterBox';
import { Tabs } from './Tabs';
import ResponsiveSortBy from 'components/ListPageTemplate/ResponsiveSortBy';
import ListPageLayout from 'components/ListPageTemplate/ListPageLayout';
import WideCardListSkeleton from 'components/WideCardListSkeleton';
import ShowFor from 'components/ShowFor';
import FilterSideSheet from 'components/FilterSideSheet';
import ResponsiveFilterBox from 'components/ListPageTemplate/ResponsiveFilterBox';
import OrderViewDetails from 'components/ViewDetails';
import RequestSection, {
  RequestSectionProps,
} from 'components/ViewDetails/RequestSection';
import ProductSection, {
  ProductSectionProps,
} from 'components/ViewDetails/ProductSection/Deployment';

// Max catalog models per page
const MAX_ITEMS_PER_PAGE = 10;
// Delay time of keyup event for refine bar search
const REFINE_DEBOUNCE = 500;

/** Type for the viewDetailsData state used for storing details of selected approval card */
export type ViewDetailsData = {
  requestSection: RequestSectionProps;
  productSection: ProductSectionProps;
};

/**
 * Contains the logic of wrapping the approvals page with a PageTemplate
 * and grabbing the data from GraphQL
 */
const ApprovalsPage: React.FC = () => {
  const { t } = useTranslation('approvals');
  const [approverState, setApproverState] = useState(ApproverState.Pending);
  const [refineValue, setRefineValue] = useState('');
  const [filterCatalogItemClass, setFilterCatalogItemClass] = useState<
    CatalogItemClass[]
  >([]);
  const [sortDirection, setSortDirection] = useState(
    OrderApprovalsSearchSortDirection.Descending,
  );
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [isFilterSideSheetOpen, setIsFilterSideSheetOpen] = useState(false);
  const [
    viewDetailsData,
    setViewDetailsData,
  ] = useState<ViewDetailsData | null>();

  const handleFiltersButtonClick = () => {
    setIsFilterSideSheetOpen(true);
  };

  const handleSideSheetClose = () => {
    setIsFilterSideSheetOpen(false);
  };

  const onFilterChange = (filter: CatalogItemClass) => {
    setFilterCatalogItemClass((prevFilters: CatalogItemClass[]) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item: CatalogItemClass) => item !== filter)
        : [...prevFilters, filter],
    );
  };

  const handleClearFilters = () => {
    setFilterCatalogItemClass([]);
    setCurrentPageNumber(1);
  };

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [refineValue, filterCatalogItemClass, sortDirection, approverState]);

  const { error, data, loading } = useQuery<MyApprovals, MyApprovalsVariables>(
    MY_APPROVALS,
    {
      variables: {
        approverState: approverState,
        sortBy:
          approverState === ApproverState.Pending
            ? OrderApprovalsSearchSortBy.ApprovalCreatedOn
            : OrderApprovalsSearchSortBy.ApproverActionedOn,
        sortDirection: sortDirection,
        refine: useDebounce(refineValue, REFINE_DEBOUNCE),
        pageNumber: currentPageNumber,
        pageSize: MAX_ITEMS_PER_PAGE,
        catalogItemClass: filterCatalogItemClass,
      },
      fetchPolicy: 'no-cache',
    },
  );

  const sortByOptions = [
    {
      value: OrderApprovalsSearchSortDirection.Descending,
      label: t('common:newestToOldest'),
    },
    {
      value: OrderApprovalsSearchSortDirection.Ascending,
      label: t('common:oldestToNewest'),
    },
  ];
  const pageCount = data ? data.myOrderApprovals.totalPages : 0;

  const refine = (
    <Refine
      label={t('common:refine')}
      inputValue={refineValue}
      onChange={e => {
        setRefineValue(e.target.value);
      }}
    />
  );

  const sortBy = (
    <ResponsiveSortBy
      handleSetSortBy={setSortDirection}
      options={sortByOptions}
      defaultSortValue={sortByOptions[0]}
      selectedOption={
        sortDirection === OrderApprovalsSearchSortDirection.Descending
          ? sortByOptions[0]
          : sortByOptions[1]
      }
    />
  );

  const pagination =
    pageCount > 1 ? (
      <Pagination
        pageCount={pageCount}
        currentPageNumber={currentPageNumber}
        onChange={setCurrentPageNumber}
      />
    ) : (
      undefined
    );

  const filtersBox = (
    <FilterBox
      filterCatalogItemClass={filterCatalogItemClass}
      onChange={onFilterChange}
      handleClearFilters={handleClearFilters}
    />
  );

  const responsiveFilterBox = (
    <ResponsiveFilterBox
      filtersBox={filtersBox}
      handleViewFiltersClick={handleFiltersButtonClick}
    />
  );

  let listContent;
  if (error) listContent = <ErrorScreen />;
  else if (loading) listContent = <WideCardListSkeleton />;
  else if (data) {
    listContent = (
      <ApprovalsList
        approverState={approverState}
        orderApprovals={data.myOrderApprovals.items}
        filteredApprovals={filterCatalogItemClass}
        setViewDetailsData={setViewDetailsData}
      />
    );
  }

  return (
    <PageTemplate hasBanner title={t('title')} subtitle={t('subtitle')}>
      <ListPageLayout
        refine={refine}
        sortBy={sortBy}
        pagination={pagination}
        filters={responsiveFilterBox}
        loading={loading}
      >
        <Grid flexDirection="column" maxWidth="920px">
          <Tabs
            approverState={approverState}
            onApproverStateChange={setApproverState}
          />
          {listContent}
        </Grid>
        <ShowFor tabletAndSmaller>
          <SideSheet
            isOpen={isFilterSideSheetOpen}
            onRequestClose={handleSideSheetClose}
          >
            <FilterSideSheet
              filters={filtersBox}
              onApply={handleSideSheetClose}
              onClearFilters={() => setFilterCatalogItemClass([])}
            />
          </SideSheet>
        </ShowFor>
        {/* View Details side sheet */}
        <SideSheet
          isOpen={!!viewDetailsData}
          onRequestClose={() => setViewDetailsData(null)}
        >
          {viewDetailsData && viewDetailsData.requestSection && (
            <OrderViewDetails
              title={t('requests:order.requestDetails')}
              sections={[
                <RequestSection {...viewDetailsData.requestSection} />,
                <ProductSection {...viewDetailsData.productSection} />,
              ]}
              onClose={() => {
                setViewDetailsData(null);
              }}
            />
          )}
        </SideSheet>
      </ListPageLayout>
    </PageTemplate>
  );
};

export default ApprovalsPage;
