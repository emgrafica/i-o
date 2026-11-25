import { gql } from 'apollo-boost';

export const OBO_USER_RIGHTS = gql`
  query oboActiveGeExpFeatures {
    oboActiveGeExpFeatures {
      id
      featureCode
      enabled
    }
  }
`;
