import { gql } from 'apollo-boost';
import { QuickLinksFragment } from 'graphql/fragments';

export const USER_PROFILE_HOME = gql`
  query UserProfileHome($userId: String) {
    userProfile(userId: $userId) {
      userId
      firstName
      lastName
      preferredName
      avatar
      locationInfo {
        country
      }
      businessInfo {
        name
      }
    }
  }
`;

export const HOME_ENTITLEMENT = gql`
  query HomeEntitlement {
    entitlement {
      obo {
        enabled
      }
      search {
        enabled
      }
    }
  }
`;

export const TENANT_CONFIG = gql`
  query TenantConfig {
    retrieveTenantConfig {
      tenantId
      getAssistance {
        helpdeskName
      }
      quickLinks {
        ...QuickLinks
      }
    }
  }
  ${QuickLinksFragment}
`;
