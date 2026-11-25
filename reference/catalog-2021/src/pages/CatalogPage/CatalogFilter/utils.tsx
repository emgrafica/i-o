import React from 'react';
import { FilterBox } from '@lumos/core';
import { Filters } from '../../CatalogPage/utils';

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

/**
 * Function that adds or removes / checks or un-checks the filters depending on if it already exists in the filter arrays
 */
const updateFilter = (
  filter: CatalogFilterNode,
  filterParent: CatalogFilterNode | null,
  filters: string[],
  updateFilterState: (dispatchType: string, selectedFilters: string[]) => void,
  filterType: string,
  childAction?: boolean,
) => {
  let selectedFilter = filter.filterName;

  if (filterType === Filters.Category && filterParent !== null) {
    selectedFilter = `${filterParent.filterName}+${selectedFilter}`;
  }

  if (filters.includes(selectedFilter)) {
    if (filter.children) {
      filter.children.forEach((child: CatalogFilterNode) => {
        updateFilter(
          child,
          filter,
          filters,
          updateFilterState,
          filterType,
          false,
        );
      });
    }

    if (!childAction) {
      const index = filters.indexOf(selectedFilter);
      if (index > -1) {
        filters.splice(index, 1);
      }

      /*
       * if we're a child filter and we're deselecting it,
       * then we also need to deselect the parent since we're
       * no longer checking the entire parent
       */
      if (filterParent && filters.includes(filterParent.filterName)) {
        const index = filters.indexOf(filterParent.filterName);
        if (index > -1) {
          filters.splice(index, 1);
        }
      }
      updateFilterState(filterType, filters);
    }
  } else {
    filters.push(selectedFilter);
    if (filter.children) {
      filter.children.forEach((child: CatalogFilterNode) => {
        updateFilter(
          child,
          filter,
          filters,
          updateFilterState,
          filterType,
          true,
        );
      });
    }

    if (
      childAction === undefined ||
      (childAction !== undefined && childAction)
    ) {
      /* if we're checking a child but the parent is not checked then check if all the children
       * are selected and if they are then select the parent as well
       */
      if (
        filterParent &&
        filterParent.children &&
        !filters.includes(filterParent.filterName)
      ) {
        const matchingChildren = filterParent.children.filter(child =>
          filters.includes(`${filterParent.filterName}+${child.filterName}`),
        );
        if (matchingChildren.length === filterParent.children.length) {
          filters.push(filterParent.filterName);
        }
      }

      updateFilterState(filterType, filters);
    }
  }
};

/**
 * Function that checks if the filter should be selected or not
 */
const isFilterChecked = (
  filter: CatalogFilterNode,
  filterParent: CatalogFilterNode | null,
  filterType: string,
  filters: string[],
  isChild?: boolean,
): boolean => {
  if (filterType === Filters.Category && filterParent !== null) {
    return isChild
      ? filters.includes(`${filterParent.filterName}+${filter.filterName}`)
      : filters.includes(filter.filterName);
  }
  return (
    filters.includes(filter.filterName) ||
    filters.includes(
      `${filterParent && filterParent.filterName}+${filter.filterName}`,
    )
  );
};

/**
 * Function that recursively returns different filter sub-components based on the arguments being passed in
 */
const createFilter = (
  filter: CatalogFilterNode,
  filterParent: CatalogFilterNode | null,
  filterType: string,
  filters: string[],
  updateFilterState: (dispatchType: string, selectedFilters: string[]) => void,
  isChild?: boolean,
): React.ReactNode => {
  // If display name is not to be shown, but the current node has children, this will not
  // render the current node and instead just iterate through the children
  if (!filter.displayFilterName && filter.children) {
    return filter.children.map((child: CatalogFilterNode) =>
      createFilter(child, null, filterType, filters, updateFilterState, true),
    );
    // If the node is filterable and has children, a checkbox will be displayed next the the
    // filter name and the children will be iterated through
  } else if (filter.filterable && filter.children) {
    return (
      <FilterBox.Category
        key={filter.filterName}
        name={filter.filterName}
        checked={isFilterChecked(
          filter,
          filterParent,
          filterType,
          filters,
          isChild,
        )}
        onChange={() => {
          updateFilter(
            filter,
            filterParent,
            filters,
            updateFilterState,
            filterType,
          );
        }}
      >
        {filter.children.map((child: CatalogFilterNode) =>
          createFilter(
            child,
            filter,
            filterType,
            filters,
            updateFilterState,
            true,
          ),
        )}
      </FilterBox.Category>
    );
    // If this conditional is met instead of the two above, the filter name will be displayed without
    // a checkbox, and then the children will be iterated through
  } else if (filter.children) {
    return (
      <FilterBox.Category key={filter.filterName} name={filter.filterName}>
        {filter.children.map((child: CatalogFilterNode) =>
          createFilter(
            child,
            filter,
            filterType,
            filters,
            updateFilterState,
            true,
          ),
        )}
      </FilterBox.Category>
    );
    // This is returned when are no children to the current node
  } else {
    return (
      <FilterBox.Item
        key={filter.filterName}
        name={filter.filterName}
        checked={isFilterChecked(
          filter,
          filterParent,
          filterType,
          filters,
          isChild,
        )}
        onChange={() =>
          updateFilter(
            filter,
            filterParent,
            filters,
            updateFilterState,
            filterType,
          )
        }
      />
    );
  }
};

export { createFilter };
