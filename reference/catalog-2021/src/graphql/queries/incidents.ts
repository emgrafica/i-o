import { gql } from 'apollo-boost';

// Using aliases to keep the response object name the name
// https://graphql.org/learn/queries/#aliases
export const INCIDENTS_FOR_LOGGED_IN_USER = gql`
  query IncidentsForLoggedInUser(
    $status: [IncidentStatusFilter!]
    $sortOrder: SortOrder
    $dateRange: DateRange
    $refine: String
  ) {
    incidentsSearch: myIncidents(
      status: $status
      sortOrder: $sortOrder
      dateRange: $dateRange
      refine: $refine
    ) {
      totalItems
      items {
        incidentId
        incidentNumber
        shortDescription
        description
        holdReason
        requestedFor {
          userId
          name
        }
        status
        submittedDate
        submittedBy {
          userId
          name
        }
        closingDetails {
          status
          reason
          date
          closedBy {
            userId
            name
          }
        }
        assignmentGroup
        assignedTo {
          userId
          name
        }
        progress {
          currentStage
          stages
        }
        actions {
          cancellable
          canBeReopened
          canAddComment
        }
      }
    }
  }
`;

export const INCIDENTS_BY_USER = gql`
  query IncidentsByUser(
    $requestedForUserId: String!
    $status: [IncidentStatusFilter!]
    $sortOrder: SortOrder
  ) {
    incidentsSearch(
      userId: $requestedForUserId
      status: $status
      sortOrder: $sortOrder
    ) {
      totalItems
      items {
        incidentId
        incidentNumber
        shortDescription
        description
        holdReason
        requestedFor {
          userId
          name
        }
        status
        submittedDate
        submittedBy {
          userId
          name
        }
        closingDetails {
          status
          reason
          date
          closedBy {
            userId
            name
          }
        }
        assignmentGroup
        assignedTo {
          userId
          name
        }
        progress {
          currentStage
          stages
        }
        actions {
          cancellable
          canBeReopened
          canAddComment
        }
      }
    }
  }
`;
