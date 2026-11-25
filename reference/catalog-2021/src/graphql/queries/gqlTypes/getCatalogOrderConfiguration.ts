/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogItemClass } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: getCatalogOrderConfiguration
// ====================================================

export interface getCatalogOrderConfiguration_catalogOrderConfiguration_billing_summary {
  __typename: "BillingDetailsSummary";
  /**
   * Text ID to be used as a locator for translations
   */
  id: string;
  /**
   * Billing summary
   */
  text: string;
}

export interface getCatalogOrderConfiguration_catalogOrderConfiguration_billing {
  __typename: "BillingDetails";
  /**
   * Billing process summary
   */
  summary: getCatalogOrderConfiguration_catalogOrderConfiguration_billing_summary | null;
}

export interface getCatalogOrderConfiguration_catalogOrderConfiguration {
  __typename: "OrderConfiguration";
  /**
   * Billing configuration details
   */
  billing: getCatalogOrderConfiguration_catalogOrderConfiguration_billing | null;
}

export interface getCatalogOrderConfiguration {
  catalogOrderConfiguration: getCatalogOrderConfiguration_catalogOrderConfiguration;
}

export interface getCatalogOrderConfigurationVariables {
  catalogClass: CatalogItemClass;
  assignedToId?: string | null;
  isReplacement?: boolean | null;
}
