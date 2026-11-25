import { gql } from 'apollo-boost';

export const ORDER_FILTERS = gql`
  query OrderFilters {
    catalogRequestFilters {
      filterName
      filterable
      displayFilterName
      children {
        filterName
        filterable
        displayFilterName
        children {
          filterName
          displayFilterName
          filterable
        }
      }
    }
  }
`;
