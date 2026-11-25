import { gql } from 'apollo-boost';

export const CANCEL_CATALOG_REQUEST = gql`
  mutation CancelCatalogRequest(
    $requestId: ID!
    $workflowId: ID!
    $reason: String!
    $etag: String!
  ) {
    cancelCatalogRequest(
      requestId: $requestId
      workflowId: $workflowId
      reason: $reason
      etag: $etag
    )
  }
`;
