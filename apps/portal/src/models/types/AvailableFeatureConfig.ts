/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AvailableFeatureConfig
// ====================================================

export interface AvailableFeatureConfig_featureConfig_requestFeatureItems {
  __typename: 'FeatureItem';
  /**
   * Service value
   */
  featureValue: string;
  /**
   * Whether or not the service should be enabled for navigation
   */
  enabled: boolean;
  /**
   * Service value
   */
  featureType: string;
  /**
   * Path in portal to open the feature in
   */
  portalFeaturePath: string | null;
  /**
   * Subscribed to service
   */
  isSubscribed: boolean;
  /**
   * Alternative punch-out link
   */
  punchOutLink: string | null;
  /**
   * Alternative punch-out messaging
   */
  punchOutMessage: string | null;
}

export interface AvailableFeatureConfig_featureConfig_manageFeatureItems {
  __typename: 'FeatureItem';
  /**
   * Service value
   */
  featureValue: string;
  /**
   * Whether or not the service should be enabled for navigation
   */
  enabled: boolean;
  /**
   * Service value
   */
  featureType: string;
  /**
   * Path in portal to open the feature in
   */
  portalFeaturePath: string | null;
  /**
   * Subscribed to service
   */
  isSubscribed: boolean;
  /**
   * Alternative punch-out link
   */
  punchOutLink: string | null;
  /**
   * Alternative punch-out messaging
   */
  punchOutMessage: string | null;
}

export interface AvailableFeatureConfig_featureConfig_allFeatureItems {
  __typename: 'FeatureItem';
  /**
   * Service value
   */
  featureValue: string;
  /**
   * Whether or not the service should be enabled for navigation
   */
  enabled: boolean;
  /**
   * Service value
   */
  featureType: string;
  /**
   * Path in portal to open the feature in
   */
  portalFeaturePath: string | null;
  /**
   * Subscribed to service
   */
  isSubscribed: boolean;
  /**
   * Alternative punch-out link
   */
  punchOutLink: string | null;
  /**
   * Alternative punch-out messaging
   */
  punchOutMessage: string | null;
}

export interface AvailableFeatureConfig_featureConfig {
  __typename: 'FeatureConfig';
  /**
   * List of request feature items
   */
  requestFeatureItems: AvailableFeatureConfig_featureConfig_requestFeatureItems[];
  /**
   * List of manage feature items
   */
  manageFeatureItems: AvailableFeatureConfig_featureConfig_manageFeatureItems[];
  /**
   * List of all feature items
   */
  allFeatureItems: AvailableFeatureConfig_featureConfig_allFeatureItems[];
}

export interface AvailableFeatureConfig {
  /**
   * Retrieves the feature configuration
   */
  featureConfig: AvailableFeatureConfig_featureConfig;
}
