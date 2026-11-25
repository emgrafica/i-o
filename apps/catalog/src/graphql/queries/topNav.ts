import { gql } from 'apollo-boost';

/**
 * Queries for the top navigation component
 */
export const AVAILABLE_FEATURE_CONFIG = gql`
  query AvailableFeatureConfig {
    featureConfig {
      requestFeatureItems {
        featureValue
        enabled
        featureType
        portalFeaturePath
        isSubscribed
        punchOutLink
        punchOutMessage
      }
      manageFeatureItems {
        featureValue
        enabled
        featureType
        portalFeaturePath
        isSubscribed
        punchOutLink
        punchOutMessage
      }
      allFeatureItems {
        featureValue
        enabled
        featureType
        portalFeaturePath
        isSubscribed
        punchOutLink
        punchOutMessage
      }
    }
  }
`;
