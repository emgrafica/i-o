import { gql } from 'apollo-boost';
import { MinifiedUserFragment } from 'graphql/fragments';
import { UserRightsFragment } from '../fragments';

// ====================================================
// OBO User Mutations
// ====================================================

export const SUBMIT_OBO_INFO = gql`
  mutation SubmitOboInfo($user: OboUser, $userRights: [OboUserRights]) {
    submitOboInfo(user: $user, userRights: $userRights) @client {
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
