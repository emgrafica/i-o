import gql from 'graphql-tag';

const APPROVALS_FRAGMENT = gql`
  fragment Approvals on Approvals {
    approvalId
    approvalReason
    approvalPolicy
    approvalStatus
    approvers {
      approver {
        firstName
        lastName
      }
    }
  }
`;

export default APPROVALS_FRAGMENT;
