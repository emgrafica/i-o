/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TenantConfig
// ====================================================

export interface TenantConfig_retrieveTenantConfig_getAssistance {
  __typename: "GetAssistance";
  /**
   * The helpdesk name configured by the Tenant
   */
  helpdeskName: string | null;
}

export interface TenantConfig_retrieveTenantConfig_quickLinks {
  __typename: "QuickLinks";
  /**
   * The URL of the quick link
   */
  url: string;
  /**
   * The display name of the URL
   */
  displayName: string;
  /**
   * The order in the Quick Links list in which the Quick Link item should be displayed
   */
  order: number;
  /**
   * If the Quick Link item should be displayed
   */
  active: boolean;
}

export interface TenantConfig_retrieveTenantConfig {
  __typename: "TenantConfig";
  /**
   * Unique ID of the Tenant
   */
  tenantId: string;
  /**
   * Data related to the Get Assistance section
   */
  getAssistance: TenantConfig_retrieveTenantConfig_getAssistance | null;
  /**
   * Data related to the Quick Links section
   */
  quickLinks: TenantConfig_retrieveTenantConfig_quickLinks[] | null;
}

export interface TenantConfig {
  /**
   * Retrieves the base Tenant Configuration
   */
  retrieveTenantConfig: TenantConfig_retrieveTenantConfig;
}
