import React from 'react';
import { FilterBox } from '@lumos/core';
import { FilterNode } from './types';

/**
 * Function that recursively returns different filter sub-components based on the arguments being passed in
 */
const createFilter = (
  filter: FilterNode,
  filterParent: FilterNode | null,
  filterType: string,
  onFilterChange: (
    filter: FilterNode,
    filterParent: FilterNode | null,
    filterType: string,
  ) => void,
): React.ReactNode => {
  // If display name is not to be shown, but the current node has children, this will not
  // render the current node and instead just iterate through the children
  if (
    !filter.displayFilterName &&
    filter.children &&
    filter.children.length !== 0
  ) {
    return filter.children.map((child: FilterNode) =>
      createFilter(child, null, filterType, onFilterChange),
    );
    // If the node is filterable and has children, a checkbox will be displayed next the the
    // filter name and the children will be iterated through
  } else if (
    filter.filterable &&
    filter.children &&
    filter.children.length !== 0
  ) {
    return (
      <FilterBox.Category
        key={filter.filterName}
        name={filter.filterNameI18n || filter.filterName}
        checked={filter.isChecked}
        onChange={() => {
          onFilterChange(filter, filterParent, filterType);
        }}
      >
        {filter.children.map((child: FilterNode) =>
          createFilter(child, filter, filterType, onFilterChange),
        )}
      </FilterBox.Category>
    );
    // If this conditional is met instead of the two above, the filter name will be displayed without
    // a checkbox, and then the children will be iterated through
  } else if (filter.children && filter.children.length !== 0) {
    return (
      <FilterBox.Category
        key={filter.filterName}
        name={filter.filterNameI18n || filter.filterName}
      >
        {filter.children.map((child: FilterNode) =>
          createFilter(child, filter, filterType, onFilterChange),
        )}
      </FilterBox.Category>
    );
    // This is returned when are no children to the current node
  } else {
    return (
      <FilterBox.Item
        key={filter.filterName}
        name={filter.filterNameI18n || filter.filterName}
        checked={filter.isChecked}
        onChange={() => onFilterChange(filter, filterParent, filterType)}
      />
    );
  }
};

export { createFilter };
