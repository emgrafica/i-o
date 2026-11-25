import { CatalogItemClass } from 'gqlTypes/globalTypes';

// Default state value of sortBy
const DEFAULT_SORT_BY_VALUE = 'Price Low to High';

/**
 * Filterable sections of <Filterbox />
 */
export interface CatalogFilterSelected {
  categories: string[];
  manufacturers: string[];
  memory: string[];
  storage: string[];
  osType: string[];
  processor: string[];
}

/**
 * Catalog selection status
 * Catalog Page Status global state will manage every selection from Catalog on one single place.
 * This will guarantee to maintain the selection state on Catalog page when navigating back to Catalog.
 * // TODO: Move currentPageNumber to catalogStatus
 */
export interface CatalogStatus {
  itemClass: CatalogItemClass | null;
  refineValue: string;
  sortBy: string;
  filtersSelected: CatalogFilterSelected;
}

/**
 * Default state of Catalog page
 * Will be used to reset Catalog page status
 */
export const initialCatalogFiltersStatus: CatalogFilterSelected = {
  categories: [],
  manufacturers: [],
  memory: [],
  storage: [],
  osType: [],
  processor: [],
};

/**
 * Default state of Catalog page
 * Will be used to reset Catalog page status
 */
export const initialCatalogStatus: CatalogStatus = {
  itemClass: null,
  refineValue: '',
  sortBy: DEFAULT_SORT_BY_VALUE,
  filtersSelected: initialCatalogFiltersStatus,
};
