import gql from 'graphql-tag';

export const BILLING_ELIGIBLE = gql`
  query BillingEligible($userId: String!, $catalogClass: CatalogItemClass!) {
    billingEligible(userId: $userId, catalogClass: $catalogClass) {
      eligible
    }
  }
`;

export default BILLING_ELIGIBLE;
