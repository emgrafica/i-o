import gql from 'graphql-tag';
import { LocationFragment } from 'graphql/fragments';

export const USER_PROFILE_REQUEST = gql`
  query UserProfileRequest($userId: String) {
    userProfile(userId: $userId) {
      userId
      firstName
      preferredName
      lastName
      phone
      email
      avatar
      locationInfo {
        ...LocationInfo
      }
      businessInfo {
        name
        tier
      }
    }
  }
  ${LocationFragment}
`;

export default USER_PROFILE_REQUEST;
