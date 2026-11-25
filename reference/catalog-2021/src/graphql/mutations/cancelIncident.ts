import { gql } from 'apollo-boost';

export const CANCEL_INCIDENT = gql`
  mutation CancelIncident(
    $incidentId: String!
    $incidentNumber: String!
    $reason: String!
  ) {
    cancelIncident(
      incidentId: $incidentId
      cancelReason: $reason
      incidentNumber: $incidentNumber
    )
  }
`;
