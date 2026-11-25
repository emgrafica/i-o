import gql from 'graphql-tag';

export const GET_CATALOG_ORDER_CONFIG = gql`
  query getCatalogOrderConfiguration(
    $catalogClass: CatalogItemClass!
    $assignedToId: String
    $isReplacement: Boolean
  ) {
    catalogOrderConfiguration(
      catalogClass: $catalogClass
      assignedToId: $assignedToId
      isReplacement: $isReplacement
    ) {
      billing {
        summary {
          id
          text
        }
      }
    }
  }
`;
