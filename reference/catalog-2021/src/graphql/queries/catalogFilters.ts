import { gql } from 'apollo-boost';

/**
 * Queries all filter options for the catalog
 */
export const CATALOG_FILTERS = gql`
  query getCatalogFilters($class: CatalogItemClass!, $userId: String!) {
    catalogFilters(class: $class, userId: $userId) {
      filterName
      displayFilterName
      filterable
      children {
        filterName
        displayFilterName
        filterable
        children {
          filterName
          displayFilterName
          filterable
        }
      }
    }
  }
`;
