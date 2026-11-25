import { gql } from 'apollo-boost';

export const ADD_INCIDENT_COMMENT = gql`
  mutation AddIncidentComment(
    $incidentId: String!
    $incidentNumber: String!
    $comment: String!
  ) {
    addComment(
      incidentId: $incidentId
      incidentNumber: $incidentNumber
      comment: $comment
    ) {
      comment
      createdOn
      createdBy {
        name
        userId
      }
      userImage
    }
  }
`;
