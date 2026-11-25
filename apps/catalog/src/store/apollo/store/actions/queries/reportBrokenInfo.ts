import { gql } from 'apollo-boost';

export const REPORT_BROKEN_INFO = gql`
  query ReportBrokenInfo {
    reportBrokenInfo @client {
      id
      image
      productName
      serialNumber
      usage
      expires
      catalogItemId
      incidentNumber
      details
      _etag
    }
  }
`;
