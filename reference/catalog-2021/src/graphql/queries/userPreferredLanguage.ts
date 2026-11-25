import gql from 'graphql-tag';

export const USER_PREFERRED_LANGUAGE = gql`
  query UserPreferredLanguage($userId: String!) {
    userPreferences(userId: $userId) {
      preferences {
        language
      }
    }
  }
`;
