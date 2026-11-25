import { gql } from 'apollo-boost';

export const GET_CHAT_CONFIG = gql`
  query ChatConfiguration($userId: String!) {
    chatConfiguration(userId: $userId) {
      helpdesk
      title
      description
      url
      urlName
    }
  }
`;
