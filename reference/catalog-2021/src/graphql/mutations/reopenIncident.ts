import { gql } from 'apollo-boost';

export const REOPEN_INCIDENT_REQUEST = gql`
  mutation reopenIncident(
    $incidentId: String!
    $reason: String!
    $incidentNumber: String!
  ) {
    reopenIncident(
      incidentId: $incidentId
      reason: $reason
      incidentNumber: $incidentNumber
    )
  }
`;
