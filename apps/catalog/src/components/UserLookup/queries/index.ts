import { gql } from 'apollo-boost';

export const SEARCH_USERS = gql`
  query SearchUsers(
    $keywords: String!
    $includeSelf: Boolean = true
    $includeFunctionalUsers: Boolean
    $order: OrderOptions = ASC
    $orderBy: OrderByOptions = FirstName
    $pageNumber: Float = 1
    $pageSize: Float = 8
  ) {
    searchUsers(
      keywords: $keywords
      includeSelf: $includeSelf
      includeFunctionalUsers: $includeFunctionalUsers
      order: $order
      orderBy: $orderBy
      pageNumber: $pageNumber
      pageSize: $pageSize
    ) {
      totalItems
      items {
        userId
        firstName
        lastName
      }
    }
  }
`;
