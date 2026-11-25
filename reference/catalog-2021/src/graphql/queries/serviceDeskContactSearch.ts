import { gql } from 'apollo-boost';

/**
 * Queries for service desk phone number and other information
 */
export const SERVICE_DESK_CONTACT_SEARCH = gql`
  query ServiceDeskContactSearch {
    serviceDeskContactSearch {
      number
      hours
      languages
    }
  }
`;
