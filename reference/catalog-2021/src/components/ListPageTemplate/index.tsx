import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SideSheet, Pagination } from '@lumos/core';
import FiltersBox from '../FiltersBox';
import { FiltersBoxProps } from '../FiltersBox/types';
import {
  RefineProps,
  SortByProps,
  PaginationProps,
  DateRangeProps,
} from 'components/ListPageTemplate/types';
import FilterSideSheet from 'components/FilterSideSheet';
import ListPageLayout from 'components/ListPageTemplate/ListPageLayout';
import Refine from 'components/Refine';
import ShowFor from 'components/ShowFor';
import ResponsiveSortBy from './ResponsiveSortBy';
import ResponsiveFilterBox from './ResponsiveFilterBox';
import ResponsiveDateRange from './ResponsiveDateRange';

/** Props for ListPageTemplate */
export interface ListPageTemplateProps {
  /** props needed to create the filter component */
  filtersBoxProps?: FiltersBoxProps;
  /** props needed to create the refine component */
  refineProps?: RefineProps;
  /** props needed to create the sortBy component */
  sortByProps?: SortByProps;
  /** props needed to create the DateRange component */
  dateRangeProps?: DateRangeProps;
  /** props needed to create the pagination component */
  paginationProps?: PaginationProps;
  /** boolean to determine whether content is loading */
  loading?: boolean;
}

/**
 * Component meant to wrap ListPageLayout. It accepts the props needed to generate the
 * components (refine, sort, pagination, filter) that are needed in ListPageLayout.
 */
const ListPageTemplate: React.FC<ListPageTemplateProps> = ({
  children,
  filtersBoxProps,
  refineProps,
  sortByProps,
  dateRangeProps,
  paginationProps,
  loading,
}) => {
  const { t } = useTranslation();
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);

  const handleFiltersButtonClick = () => {
    setIsSideSheetOpen(true);
  };

  const handleSideSheetClose = () => {
    setIsSideSheetOpen(false);
  };

  const refine = refineProps ? (
    <Refine
      label={t('common:refine')}
      inputValue={refineProps.refineValue}
      onChange={refineProps.handleRefineChange}
    />
  ) : (
    undefined
  );

  const responsiveSortBy = sortByProps && (
    <ResponsiveSortBy
      handleSetSortBy={sortByProps.handleSetSortBy}
      options={sortByProps.options}
      defaultSortValue={sortByProps.defaultSortValue}
      selectedOption={sortByProps.selectedOption}
    />
  );

  const responsiveDateRange = dateRangeProps ? (
    <ResponsiveDateRange
      handleDateRange={dateRangeProps.handleSetDateRange}
      options={dateRangeProps.options}
      defaultDateRangeValue={dateRangeProps.defaultDateRangeValue}
      selectedOption={dateRangeProps.selectedOption}
    />
  ) : (
    undefined
  );

  const filtersBox = filtersBoxProps && (
    <FiltersBox
      width="100%"
      loading={filtersBoxProps.loading}
      error={filtersBoxProps.error}
      filters={filtersBoxProps.filters}
      refetch={filtersBoxProps.refetch}
      onFilterChange={filtersBoxProps.onFilterChange}
      handleClearFilters={filtersBoxProps.handleClearFilters}
    />
  );

  const filters = filtersBox ? (
    <ResponsiveFilterBox
      filtersBox={filtersBox}
      handleViewFiltersClick={handleFiltersButtonClick}
    />
  ) : (
    undefined
  );

  const pagination =
    paginationProps &&
    paginationProps.totalHits > paginationProps.maxItemsPerPage ? (
      <Pagination
        pageCount={paginationProps.pageCount}
        onChange={paginationProps.handlePaginationClick}
        currentPageNumber={paginationProps.currentPageNumber}
      />
    ) : (
      undefined
    );

  return (
    <ListPageLayout
      refine={refine}
      dateRange={responsiveDateRange}
      sortBy={responsiveSortBy}
      pagination={pagination}
      filters={filters}
      loading={loading}
    >
      {children}
      <ShowFor tabletAndSmaller>
        {filtersBox && (
          <SideSheet
            isOpen={isSideSheetOpen}
            onRequestClose={handleSideSheetClose}
          >
            <FilterSideSheet
              filters={filtersBox}
              onApply={handleSideSheetClose}
              onClearFilters={
                filtersBoxProps && filtersBoxProps.handleClearFilters
              }
            />
          </SideSheet>
        )}
      </ShowFor>
    </ListPageLayout>
  );
};

export default ListPageTemplate;
