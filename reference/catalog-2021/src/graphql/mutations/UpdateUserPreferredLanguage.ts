import { gql } from 'apollo-boost';

export const UPDATE_USER_PREFERRED_LANGUAGE = gql`
  mutation UpdateUserPreferredLanguage($userId: String!, $language: String!) {
    updateUserPreferredLanguage(userId: $userId, language: $language)
  }
`;
