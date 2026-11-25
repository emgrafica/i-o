import React from 'react';
import { FilterNode } from 'components/FiltersBox/types';
import FilterChips from 'components/FilterChips';
import { createSelectedChips } from '../utils';

/**
 * Props for CatalogFilterChipsProps
 */
export interface CatalogFilterChipsProps {
  /**
   * Full tree of filters
   */
  filters: FilterNode[];
  /**
   * Method to be executed when chip's close button is clicked.
   */
  handleChipClose: (
    filter: FilterNode,
    filterParent: FilterNode | null,
    filterType: string,
  ) => void;
  /**
   * Method to be executed when Clear Filters button is clicked.
   */
  handleClearFilters: () => void;
}

/**
 * Filter Chips component will render a list of selected filters from a given Filters list
 */
const CatalogFilterChips: React.FC<CatalogFilterChipsProps> = ({
  filters,
  handleChipClose,
  handleClearFilters,
}) => {
  return (
    <FilterChips handleClearFilters={handleClearFilters}>
      {filters &&
        filters.map((filter: FilterNode) => {
          return createSelectedChips(
            filter,
            null,
            filter.filterName,
            handleChipClose,
          );
        })}
    </FilterChips>
  );
};

export default CatalogFilterChips;
