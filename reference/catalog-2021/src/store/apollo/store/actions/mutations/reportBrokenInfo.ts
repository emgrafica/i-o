import { gql } from 'apollo-boost';

export const SET_REPORT_BROKEN_INFO = gql`
  mutation SetReportBrokenInfo($reportBrokenInput: ReportBrokenInput) {
    setReportBrokenInfo(reportBrokenInput: $reportBrokenInput) @client {
      id
    }
  }
`;
