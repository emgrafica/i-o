import { gql } from 'apollo-boost';
import { MinifiedUserFragment } from 'graphql/fragments';
import { UserRightsFragment } from '../fragments';

// ====================================================
// OBO User Queries
// ====================================================

export const OBO_INFO = gql`
  query OboInfo {
    oboInfo @client {
      user {
        ...MinifiedUser
      }
      userRights {
        ...UserRights
      }
    }
  }
  ${MinifiedUserFragment}
  ${UserRightsFragment}
`;
