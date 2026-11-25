import { gql } from 'apollo-boost';

/**
 * Queries for subscription information on tenant configurable services
 */
export const SERVICE_SUBSCRIPTIONS = gql`
  query ServiceSubscriptions {
    retrieveTenantConfig {
      serviceSubscriptions {
        requestAccessories {
          isSubscribed
          punchOutLink
        }
        requestComputers {
          isSubscribed
          punchOutLink
        }
        requestMobileDevices {
          isSubscribed
          punchOutLink
        }
        requestRemoteAccess {
          isSubscribed
          punchOutLink
        }
        requestSoftware {
          isSubscribed
          punchOutLink
        }
        getSupport {
          isSubscribed
          punchOutLink
        }
      }
    }
  }
`;
