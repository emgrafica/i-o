import React from 'react';
import { Filters } from '../utils';
import { FilterNode } from 'components/FiltersBox/types';
import Chip from 'components/Chip';
import { useTranslation } from 'react-i18next';
import SkeletonCatalogCard from './CatalogCardList/SkeletonCatalogCard';
import SkeletonCatalogCardMobile from './CatalogCardList/SkeletonCatalogCardMobile';
import { Col } from 'components/GridLayout';
import { Device } from '../../../utils/useDevice';

/**
 * updateFilter adds or removes / checks or un-checks the filters depending on if it already exists in the filter arrays
 * @param filter current filter node.
 * @param filterParent current filter parent node.
 * @param filterType current filter type.
 * @param selectedFilters selected filters to be added to the state.
 * @param updateFilterState function to set new filters state.
 * @param childAction will say if current filter is not top level of the tree.
 */
export const updateFilter = (
  filter: FilterNode,
  filterParent: FilterNode | null,
  filterType: string,
  selectedFilters: string[],
  updateFilterState: (dispatchType: string, selectedFilters: string[]) => void,
  childAction?: boolean,
) => {
  let selectedFilter = filter.filterName;

  if (filterType === Filters.Category && filterParent !== null) {
    selectedFilter = `${filterParent.filterName}+${selectedFilter}`;
  }

  if (selectedFilters.includes(selectedFilter)) {
    if (filter.children) {
      filter.children.forEach((child: FilterNode) => {
        updateFilter(
          child,
          filter,
          filterType,
          selectedFilters,
          updateFilterState,
          false,
        );
      });
    }

    if (!childAction) {
      const index = selectedFilters.indexOf(selectedFilter);
      if (index > -1) {
        selectedFilters.splice(index, 1);
      }

      /*
       * if we're a child filter and we're deselecting it,
       * then we also need to deselect the parent since we're
       * no longer checking the entire parent
       */
      if (filterParent && selectedFilters.includes(filterParent.filterName)) {
        const index = selectedFilters.indexOf(filterParent.filterName);
        if (index > -1) {
          selectedFilters.splice(index, 1);
        }
      }
      updateFilterState(filterType, selectedFilters);
    }
  } else {
    selectedFilters.push(selectedFilter);
    if (filter.children) {
      filter.children.forEach((child: FilterNode) => {
        updateFilter(
          child,
          filter,
          filterType,
          selectedFilters,
          updateFilterState,
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
        !selectedFilters.includes(filterParent.filterName)
      ) {
        const matchingChildren = filterParent.children.filter(child =>
          selectedFilters.includes(
            `${filterParent.filterName}+${child.filterName}`,
          ),
        );
        if (matchingChildren.length === filterParent.children.length) {
          selectedFilters.push(filterParent.filterName);
        }
      }

      updateFilterState(filterType, selectedFilters);
    }
  }
};

/**
 * isFilterChecked checks if the filter should be selected or not
 * @param filter current filter node.
 * @param filterParent current filter parent node.
 * @param filterType current filter type.
 * @param selectedFilters selected filters to be set as checked.
 * @param isChild will say if current filter is not top level of the tree.
 */
export const isFilterChecked = (
  filter: FilterNode,
  filterParent: FilterNode | null,
  filterType: string,
  selectedFilters: string[],
  isChild?: boolean,
): boolean => {
  if (filterType === Filters.Category && filterParent !== null) {
    return isChild
      ? selectedFilters.includes(
          `${filterParent.filterName}+${filter.filterName}`,
        )
      : selectedFilters.includes(filter.filterName);
  }
  return (
    selectedFilters.includes(filter.filterName) ||
    selectedFilters.includes(
      `${filterParent && filterParent.filterName}+${filter.filterName}`,
    )
  );
};

/**
 * setFilterCheckbox will update selected checkboxes on Catalog Filters nodes
 * @param filter current filter node.
 * @param filterParent current filter parent node.
 * @param filterType current filter type.
 * @param selectedFilters selected filters to be set as checked.
 * @param isChild will say if current filter is not top level of the tree.
 */
export const setFilterCheckbox = (
  filter: FilterNode,
  filterParent: FilterNode | null,
  filterType: string,
  selectedFilters: string[],
  isChild?: boolean,
) => {
  if (filter.filterable) {
    filter.isChecked = isFilterChecked(
      filter,
      filterParent,
      filterType,
      selectedFilters,
      isChild,
    );
  }

  if (filter.children) {
    filter.children.forEach((child: FilterNode) =>
      setFilterCheckbox(child, filter, child.filterName, selectedFilters, true),
    );
  }
};

/**
 * Get selected filters based on filter category name
 * @param filterName - filter name
 */
export const getSelectedFilters = (
  filterName: String,
  filters: any,
): string[] => {
  switch (filterName) {
    case Filters.Category:
      return [...filters.categories];

    case Filters.Manufacturer:
      return [...filters.manufacturers];

    case Filters.Memory:
      return [...filters.memory];

    case Filters.OperatingSystem:
      return [...filters.osType];

    case Filters.Processor:
      return [...filters.processor];

    case Filters.Storage:
      return [...filters.storage];

    default:
      return [];
  }
};

/**
 * parseToFilterNodes will update selected checkboxes on Catalog Filters nodes
 * @param catalogFilters contains array of filter nodes to be passed.
 * @param getSelectedFilters function to get current selected filters based on the filter name.
 */
export const parseToFilterNodes = (
  catalogFilters: FilterNode[],
  getSelectedFilters: (filterName: String, filters: any) => string[],
  filterState: any,
): FilterNode[] => {
  return catalogFilters.map((filter: FilterNode) => {
    const selectedFilters = getSelectedFilters(filter.filterName, filterState);
    setFilterCheckbox(filter, null, filter.filterName, selectedFilters);
    return filter;
  });
};

/**
 * Returns the corresponding translated text for the specified sortBy value
 * @param sortByValue - State that represents selected sortBy value
 */
export const useSortByValue = (sortByValue: string) => {
  const { t } = useTranslation('catalog');
  switch (sortByValue) {
    case 'Price Low to High':
      return t('sortBy.priceLowToHigh');
    case 'Price High to Low':
      return t('sortBy.priceHighToLow');
    case 'Name A to Z':
      return t('sortBy.nameAtoZ');
    case 'Name Z to A':
      return t('sortBy.nameZtoA');
  }

  throw new Error(`(${sortByValue}) is not a valid sorting option.`);
};

/**
 * Function that recursively returns chips based on selected filter
 * @param filter - filter node to verify if is valid to render as Chip
 * @param filterParent - current filter's parent
 * @param filterType - current filter type
 * @param handleChipClose - method to be executed when chip close button is clicked
 */
export const createSelectedChips = (
  filter: FilterNode,
  filterParent: FilterNode | null,
  filterType: string,
  handleChipClose: (
    filter: FilterNode,
    filterParent: FilterNode | null,
    filterType: string,
  ) => void,
): React.ReactNode => {
  let chips = null;

  // If filter has children continue searching until getting the last filter of this filters branch
  if (filter.children) {
    chips = filter.children.map((child: FilterNode) =>
      // If parent has displayFilterName as false, is equivalent to not having parent
      createSelectedChips(
        child,
        filter.displayFilterName ? filter : null,
        filterType,
        handleChipClose,
      ),
    );
    // If filter doesn't have children means it's the last one, is if is checked, create a Chip
  } else if (filter.isChecked) {
    chips = (
      <Chip
        key={filter.filterName}
        onClose={() => handleChipClose(filter, filterParent, filterType)}
      >
        {filter.filterNameI18n || filter.filterName}
      </Chip>
    );
  }

  return chips;
};

/**
 * Function that returns catalog skeleton based on large or medium device screen size
 * @param cardsAmount - Sets the appropriate number of cards based on device
 * @param device - Current view based on device
 */
export const createSkeletonCatalogCardList = (
  cardsAmount: number,
  device: number,
) => {
  let skeletons = [];
  for (let i = 0; i < cardsAmount; i++) {
    skeletons.push(
      <Col
        key={`catalogCardSkeleton:${i}`}
        display="column"
        colspan={{
          xxs: '12',
          md: '4',
        }}
        paddingBottom={3}
      >
        {device === Device.Mobile ? (
          <SkeletonCatalogCardMobile />
        ) : (
          <SkeletonCatalogCard />
        )}
      </Col>,
    );
  }
  return skeletons;
};
