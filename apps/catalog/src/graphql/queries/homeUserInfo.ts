import gql from 'graphql-tag';

export const USER_APPROVALS = gql`
  query UserApprovals($approverUserId: String!) {
    orderApprovalsCount(approverUserId: $approverUserId)
  }
`;

export const USER_ORDERS = gql`
  query UserOrders(
    $requestedForUserId: String!
    $requestStatus: [RequestShortStatusType!]
  ) {
    catalogRequestsByUser(
      requestedForUserId: $requestedForUserId
      requestStatus: $requestStatus
    ) {
      totalHits
    }
  }
`;

export const USER_INCIDENTS = gql`
  query UserIncidents($userId: String!, $status: [IncidentStatusFilter!]) {
    incidentsSearch(userId: $userId, status: $status) {
      totalItems
    }
  }
`;
