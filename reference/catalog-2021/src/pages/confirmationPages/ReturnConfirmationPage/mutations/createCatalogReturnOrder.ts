import { gql } from 'apollo-boost';

/**
 * Mutation to submit a Return Order
 */
export const CREATE_CATALOG_RETURN_ORDER = gql`
  mutation CreateCatalogReturnOrder($data: CreateCatalogReturnOrderInput!) {
    createCatalogReturnOrder(data: $data) {
      requestId
    }
  }
`;
