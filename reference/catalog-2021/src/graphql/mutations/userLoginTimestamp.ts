import { gql } from 'apollo-boost';

export const USER_LOGIN_TIMESTAMP = gql`
  mutation UserLoginTimestamp($userId: String!) {
    userLoginTimestamp(userId: $userId) {
      lastLoginTime
    }
  }
`;
