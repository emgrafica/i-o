import { gql } from 'apollo-boost';

export const INCIDENT_COMMENTS = gql`
  query IncidentComments($incidentId: String!) {
    incidentComments(incidentId: $incidentId) {
      items {
        comment
        createdOn
        createdBy {
          userId
          name
        }
        userImage
      }
    }
  }
`;
