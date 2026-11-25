import { CatalogItemClass } from 'gqlTypes/globalTypes';
import { Filters, FilterSelectedField } from './utils';
import {
  CatalogStatus,
  initialCatalogStatus,
  initialCatalogFiltersStatus,
} from 'store/CatalogStatus';

/**
 * setFiltersSelectedByType will set given selected filters on field matching given type.
 * @param type Filters enum that match a field on selectedFilters array
 * @param selectedFilters array of strings representing selected filters
 * @param catalogStatus CatalogStatus that will be updated with new selected filters
 * @param setCatalogStatus function to set catalog status with new selected filters
 */
const setFiltersSelectedByType = (
  type: string,
  selectedFilters: string[],
  catalogStatus: CatalogStatus,
  setCatalogStatus: (value: CatalogStatus) => void,
) => {
  setCatalogStatus({
    ...catalogStatus,
    filtersSelected: {
      ...catalogStatus.filtersSelected,
      [type]: selectedFilters,
    },
  });
};

/**
 * setFilters will set given selected filters on the matching type.
 * If given type doesn't match any expected type, it will reset the filters for every type to empty arrays.
 * @param type Filters enum that match a field on selectedFilters array
 * @param selectedFilters array of strings representing selected filters
 * @param catalogStatus CatalogStatus that will be updated with new selected filters
 * @param setCatalogStatus function to set catalog status with new selected filters
 */
export const setFilters = (
  type: string,
  selectedFilters: string[],
  catalogStatus: CatalogStatus,
  setCatalogStatus: (value: CatalogStatus) => void,
) => {
  switch (type) {
    case Filters.Category:
      setFiltersSelectedByType(
        FilterSelectedField.Categories,
        selectedFilters,
        catalogStatus,
        setCatalogStatus,
      );
      break;
    case Filters.Manufacturer:
      setFiltersSelectedByType(
        FilterSelectedField.Manufacturers,
        selectedFilters,
        catalogStatus,
        setCatalogStatus,
      );
      break;
    case Filters.Memory:
      setFiltersSelectedByType(
        FilterSelectedField.Memory,
        selectedFilters,
        catalogStatus,
        setCatalogStatus,
      );
      break;
    case Filters.Storage:
      setFiltersSelectedByType(
        FilterSelectedField.Storage,
        selectedFilters,
        catalogStatus,
        setCatalogStatus,
      );
      break;
    case Filters.OperatingSystem:
      setFiltersSelectedByType(
        FilterSelectedField.OsType,
        selectedFilters,
        catalogStatus,
        setCatalogStatus,
      );
      break;
    case Filters.Processor:
      setFiltersSelectedByType(
        FilterSelectedField.Processor,
        selectedFilters,
        catalogStatus,
        setCatalogStatus,
      );
      break;
    default:
      //Filters are reset by default
      setCatalogStatus({
        ...catalogStatus,
        filtersSelected: initialCatalogFiltersStatus,
      });
      break;
  }
};

/**
 * resetCatalogStatus will set Catalog status to initial default values.
 * @param catalogItemClass CatalogItemClass of current Catalog page
 * @param setCatalogStatus function to set Catalog Status with initial default values and given catalogItemClass
 */
export const resetCatalogStatus = (
  catalogItemClass: CatalogItemClass,
  setCatalogStatus: (value: CatalogStatus) => void,
) => {
  setCatalogStatus({
    ...initialCatalogStatus,
    itemClass: catalogItemClass,
  });
};
