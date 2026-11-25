import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Box, FilterBox } from '@lumos/core';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import { CATALOG_FILTERS } from 'graphql/queries';
import { Filters } from '../utils';
import { createFilter } from './utils';
import { CatalogFilterSelected } from 'store/CatalogStatus';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { useUserId } from 'containers/AuthContainer/AuthContext';

interface CatalogFilterNode {
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
  /**
   * Child filters that this filter has
   */
  children: CatalogFilterNode[] | null;
}

interface CatalogFilters {
  /**
   * Retrieves the catalog filters based on the available data in the catalog for the specific catalog class
   */
  catalogFilters: CatalogFilterNode[];
}

/**
 * Props for CatalogFilters
 */
interface CatalogFilterProps {
  catalogItemClass: CatalogItemClass;
  updateFilterState: (dispatchType: string, selectedFilters: string[]) => void;
  filterState: CatalogFilterSelected;
}

/**
 * Catalog Filter
 *
 * @param catalogItemClass - catalog class used to get catalog-specific filters
 * @param updateFilterState - dispatch function for filterStateReducer
 * @param filterState - current state of <FilterBox />
 *
 */
const CatalogFilter: React.FC<CatalogFilterProps> = ({
  catalogItemClass,
  updateFilterState,
  filterState,
}) => {
  const userId = useUserId();
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;

  let categories: string[] = [];
  let manufacturers: string[] = [];
  let memory: string[] = [];
  let storage: string[] = [];
  let osType: string[] = [];
  let processor: string[] = [];
  if (filterState) {
    ({
      categories,
      manufacturers,
      memory,
      storage,
      osType,
      processor,
    } = filterState);
  }
  const { loading, data, error } = useQuery<CatalogFilters>(CATALOG_FILTERS, {
    variables: {
      class: catalogItemClass,
      userId: oboUser ? oboUser.userId : userId!,
    },
  });

  /**
   * TODO: Remove this function when this component is abstracted out to components
   * Sets filters based on filter category
   * @param filter - object containing filter data
   */
  const setCurrentFilter = (filter: CatalogFilterNode): string[] => {
    let filters: string[] = [];
    if (filter.filterName === Filters.Category) {
      filters = [...categories];
    } else if (filter.filterName === Filters.Manufacturer) {
      filters = [...manufacturers];
    } else if (filter.filterName === Filters.Memory) {
      filters = [...memory];
    } else if (filter.filterName === Filters.OperatingSystem) {
      filters = [...osType];
    } else if (filter.filterName === Filters.Processor) {
      filters = [...processor];
    } else if (filter.filterName === Filters.Storage) {
      filters = [...storage];
    }
    return filters;
  };

  let filterContent;
  if (!loading && !error) {
    filterContent = (
      <FilterBox>
        {data &&
          data.catalogFilters &&
          data.catalogFilters.map((filter: CatalogFilterNode) => {
            const filters = setCurrentFilter(filter);
            return createFilter(
              filter,
              null,
              filter.filterName,
              filters,
              updateFilterState,
            );
          })}
      </FilterBox>
    );
  }

  return (
    <Box minWidth="200px">
      <Box>{filterContent}</Box>
    </Box>
  );
};

export default CatalogFilter;
