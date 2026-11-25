import { gql } from 'apollo-boost';

export const APPROVER_ACTION = gql`
  mutation approverAction($data: ApproverActionArgs!) {
    approverAction(data: $data)
  }
`;
