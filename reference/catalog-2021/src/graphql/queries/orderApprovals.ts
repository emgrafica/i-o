import { gql } from 'apollo-boost';

/**
 * Queries all Requests
 */
export const MY_APPROVALS = gql`
  query MyApprovals(
    $approverState: ApproverState
    $catalogItemClass: [CatalogItemClass!]
    $pageSize: Float
    $pageNumber: Float
    $refine: String
    $sortBy: OrderApprovalsSearchSortBy
    $sortDirection: OrderApprovalsSearchSortDirection
  ) {
    myOrderApprovals(
      approverState: $approverState
      catalogItemClass: $catalogItemClass
      pageSize: $pageSize
      pageNumber: $pageNumber
      refine: $refine
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      totalItems
      pageNumber
      pageSize
      totalPages
      items {
        _etag
        approval {
          id
          labelDescription
        }
        approver {
          id
          actionedOn
          comment
        }
        lineItem {
          id
          catalogItemImage
          catalogItemName
          reasonForRequest
          pricing {
            format
            enabled
            value
          }
        }
        order {
          id
          justification
          createdOn
          requestedForFirstName
          requestedForLastName
        }
      }
    }
  }
`;
