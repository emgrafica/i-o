import gql from 'graphql-tag';

const CATALOG_SORT_OPTIONS_FRAGMENT = gql`
  fragment CatalogSortOptions on CatalogSortOptions {
    dropdownOptions {
      label
      value
    }
    sortOptions {
      sortValue
      sortOption
      sortOptionId
    }
  }
`;

export default CATALOG_SORT_OPTIONS_FRAGMENT;
