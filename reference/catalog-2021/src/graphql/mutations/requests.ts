import { gql } from 'apollo-boost';

export const REPORT_BROKEN = gql`
  mutation ReportBroken($data: ReportBrokenArgs!) {
    reportBroken(data: $data) {
      ticketId
    }
  }
`;
