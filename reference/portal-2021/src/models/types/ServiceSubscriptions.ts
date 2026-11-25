/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ServiceSubscriptions
// ====================================================

export interface ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestAccessories {
  __typename: 'SubscriptionInfo';
  /**
   * Subscribed to service
   */
  isSubscribed: boolean;
  /**
   * Alternative punch-out link
   */
  punchOutLink: string | null;
}

export interface ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestComputers {
  __typename: 'SubscriptionInfo';
  /**
   * Subscribed to service
   */
  isSubscribed: boolean;
  /**
   * Alternative punch-out link
   */
  punchOutLink: string | null;
}

export interface ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestMobileDevices {
  __typename: 'SubscriptionInfo';
  /**
   * Subscribed to service
   */
  isSubscribed: boolean;
  /**
   * Alternative punch-out link
   */
  punchOutLink: string | null;
}

export interface ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestRemoteAccess {
  __typename: 'SubscriptionInfo';
  /**
   * Subscribed to service
   */
  isSubscribed: boolean;
  /**
   * Alternative punch-out link
   */
  punchOutLink: string | null;
}

export interface ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestSoftware {
  __typename: 'SubscriptionInfo';
  /**
   * Subscribed to service
   */
  isSubscribed: boolean;
  /**
   * Alternative punch-out link
   */
  punchOutLink: string | null;
}

export interface ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_getSupport {
  __typename: 'SubscriptionInfo';
  /**
   * Subscribed to service
   */
  isSubscribed: boolean;
  /**
   * Alternative punch-out link
   */
  punchOutLink: string | null;
}

export interface ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions {
  __typename: 'ServiceSubscriptions';
  /**
   * Subscription information for the Accessories Request Service
   */
  requestAccessories: ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestAccessories;
  /**
   * Subscription information for the Computers Request Service
   */
  requestComputers: ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestComputers;
  /**
   * Subscription information for the Mobile Devices Request Service
   */
  requestMobileDevices: ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestMobileDevices;
  /**
   * Subscription information for the Remote Access Request Service
   */
  requestRemoteAccess: ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestRemoteAccess;
  /**
   * Subscription information for the Software Request Service
   */
  requestSoftware: ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_requestSoftware;
  /**
   * Subscription information for the Software Request Service
   */
  getSupport: ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions_getSupport;
}

export interface ServiceSubscriptions_retrieveTenantConfig {
  __typename: 'TenantConfig';
  /**
   * Core Portal Services subscriptions
   */
  serviceSubscriptions: ServiceSubscriptions_retrieveTenantConfig_serviceSubscriptions;
}

export interface ServiceSubscriptions {
  /**
   * Retrieves the base Tenant Configuration
   */
  retrieveTenantConfig: ServiceSubscriptions_retrieveTenantConfig;
}
