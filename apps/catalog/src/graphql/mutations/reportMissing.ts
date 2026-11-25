import { gql } from 'apollo-boost';

export const REPORT_MISSING = gql`
  mutation ReportMissing(
    $assetId: String!
    $requestedForId: String!
    $description: String!
    $caseNumber: String!
    $serialNumber: String!
  ) {
    reportMissing(
      assetId: $assetId
      requestedForId: $requestedForId
      description: $description
      caseNumber: $caseNumber
      serialNumber: $serialNumber
    ) {
      ticketId
    }
  }
`;
