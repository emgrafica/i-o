import React, { useContext } from 'react';
import { ApolloError } from 'apollo-client';
import CatalogCardList from './CatalogCardList';
import LargeAlertWell from 'components/LargeAlertWell';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import { CatalogData_catalogModels } from 'graphql/queries/gqlTypes/CatalogData';
import { CatalogAlertWell_catalogAlertWell } from 'graphql/queries/gqlTypes/CatalogAlertWell';
import { CatalogSortOptions_catalogSortOptions } from 'graphql/queries/gqlTypes/CatalogSortOptions';
import { CatalogFilterSelected } from 'store/CatalogStatus';
import ReplacementBanner from 'components/ReplacementBanner';
import { useReplacementInfo } from 'store/apollo/store/hooks';
import ListPageTemplate from 'components/ListPageTemplate';
import { FilterNode } from 'components/FiltersBox/types';
import { updateFilter, getSelectedFilters, useSortByValue } from './utils';
import { CatalogPageContext } from '../CatalogPageContext';
import { showWipCatalogFilters } from 'utils/showWorkInProgress';

import { DocumentNode } from 'components/RichTextRenderer/utils';

// Max catalog models per page
const MAX_ITEMS_PER_PAGE = 24;

// defaultValue prop for SortBy
const DEFAULT_SORT_BY_VALUE = {
  label: 'Price: Low to High',
  value: 'Price: Low to High',
};

/**
 * Props for CatalogContentProps
 */
export interface CatalogContentProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;

  /**
   * Catalog models available in catalog plus pagination
   */
  catalogModels: CatalogData_catalogModels | null;

  /**
   * Alert Well
   */
  catalogAlertWell?: CatalogAlertWell_catalogAlertWell;

  /**
   * Sort options to be used
   */
  catalogSortOptions: CatalogSortOptions_catalogSortOptions;

  /**
   * Function to set field to Sort by
   */
  setSortBy: Function;

  /**
   * Current value of sortBy dropdown
   */
  sortBy: string;

  /**
   * Filters selected
   */
  filters: CatalogFilterSelected;
  /**
   * Function to set Filters selected
   */
  setFilters: Function;

  /**
   * Current Catalog page selected
   */
  currentPageNumber: number;

  /**
   * Function to set current Catalog page selected
   */
  setCurrentPageNumber: Function;

  /**
   * Current Refine value
   */
  refineValue: string;
  /**
   * Function to set current Refine value
   */
  setRefineValue: Function;
  /**
   * Is catalog cards loading
   */
  loading: boolean;
  /**
   * Is catalog models query erroring
   */
  catalogModelsError?: ApolloError;
  /**
   * Catalog models refetch function
   */
  catalogModelsRefetch: Function;
  /**
   * Catalog filters refetch function
   */
  catalogFiltersRefetch: Function;
}

/**
 * Catalog content component
 */
const CatalogContent: React.FC<CatalogContentProps> = ({
  catalogItemClass,
  catalogModels,
  catalogAlertWell,
  catalogSortOptions,
  filters,
  setFilters,
  setSortBy,
  sortBy,
  currentPageNumber,
  setCurrentPageNumber,
  refineValue,
  setRefineValue,
  loading,
  catalogModelsError,
  catalogModelsRefetch,
  catalogFiltersRefetch,
}) => {
  const replacementInfo = useReplacementInfo();
  const { filterBoxProps } = useContext(CatalogPageContext);
  let totalHits,
    totalPages = 0;
  if (catalogModels && catalogModels.totalHits) {
    totalHits = catalogModels.totalHits;
  }
  if (catalogModels && catalogModels.totalPages) {
    totalPages = catalogModels.totalPages;
  }

  let dropdownOptions: any = [];
  if (catalogModels && catalogSortOptions) {
    dropdownOptions = catalogSortOptions.dropdownOptions;
  }

  // Sets state to refine catalog data
  const handleRefineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRefineValue(e.target.value);
  };

  /**
   * Sets current page number based on <Pagination /> click
   * @param pageNumber - Page number requested via Pagination component
   */
  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  };

  /**
   * Handles update of filterState
   *
   * @param dispatchType - Type of action being taken against filterState
   * @param selectedFilters - Currently selected filters
   */
  const updateFilterState = (
    dispatchType: string,
    selectedFilters: string[],
  ) => {
    setFilters({ type: dispatchType, selectedFilters });
    setCurrentPageNumber(1);
  };

  /**
   * Updates sortBy state
   *
   * @param selectedItem - Item value from dropdown menu item
   */
  const handleSetSortBy = (selectedItem: string) => {
    setSortBy(selectedItem);
  };

  /**
   * Updates filter selection state
   *
   * @param filter - current filter that changed
   * @param filterParent - current filter parent
   * @param filterType - current filter type
   */
  const onFilterChange = (
    filter: FilterNode,
    filterParent: FilterNode | null,
    filterType: string,
  ) => {
    const selectedFilters = getSelectedFilters(filterType, filters);
    updateFilter(
      filter,
      filterParent,
      filterType,
      selectedFilters,
      updateFilterState,
    );
  };

  const handleClearFilters = () => {
    setFilters();
    setCurrentPageNumber(1);
  };

  // Get translated text for selected sortBy label
  const sortByLabel = useSortByValue(sortBy);
  return (
    <>
      {replacementInfo ? <ReplacementBanner {...replacementInfo} /> : null}
      {catalogAlertWell && catalogAlertWell.message ? (
        <LargeAlertWell
          enabled={catalogAlertWell.enabled}
          message={catalogAlertWell.message as DocumentNode}
        />
      ) : null}

      <ListPageTemplate
        filtersBoxProps={
          showWipCatalogFilters
            ? {
                loading: filterBoxProps.loading,
                error: !!filterBoxProps.error,
                filters: filterBoxProps.filters,
                refetch: catalogFiltersRefetch,
                onFilterChange,
                handleClearFilters,
              }
            : undefined
        }
        refineProps={{
          refineValue,
          handleRefineChange,
        }}
        sortByProps={
          dropdownOptions.length > 0
            ? {
                handleSetSortBy,
                options: dropdownOptions ? dropdownOptions : [],
                defaultSortValue: DEFAULT_SORT_BY_VALUE,
                selectedOption: { label: sortByLabel, value: sortBy },
              }
            : undefined
        }
        paginationProps={{
          totalHits: totalHits ? totalHits : 0,
          pageCount: totalPages as number,
          currentPageNumber,
          maxItemsPerPage: MAX_ITEMS_PER_PAGE,
          handlePaginationClick,
        }}
        loading={loading}
      >
        <CatalogCardList
          catalogItemClass={catalogItemClass}
          catalogModels={catalogModels && catalogModels.catalogModels}
          totalHits={totalHits ? totalHits : 0}
          loading={loading}
          catalogModelsError={catalogModelsError}
          catalogModelsRefetch={() => catalogModelsRefetch()}
        />
      </ListPageTemplate>
    </>
  );
};

export default CatalogContent;
