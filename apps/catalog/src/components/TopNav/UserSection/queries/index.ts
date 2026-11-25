import gql from 'graphql-tag';

export const USER_PROFILE_TOP_NAV = gql`
  query UserProfileTopNav($userId: String) {
    userProfile(userId: $userId) {
      firstName
      lastName
      avatar
      preferredName
    }
  }
`;
export default USER_PROFILE_TOP_NAV;
