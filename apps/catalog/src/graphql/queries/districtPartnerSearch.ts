import { gql } from 'apollo-boost';

/**
 * Queries for subscription information on tenant configurable services
 */
export const DISTRICT_PARTNER_SEARCH = gql`
  query DistrictPartnerSearch {
    districtPartnerSearch {
      name
      username
      email
      phone
    }
  }
`;
