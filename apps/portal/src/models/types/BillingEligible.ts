/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogItemClass } from './../globalTypes';

// ====================================================
// GraphQL query operation: BillingEligible
// ====================================================

export interface BillingEligible_billingEligible {
  __typename: 'BillingEligibility';
  /**
   * Whether or not the user is eligible for billing
   */
  eligible: boolean;
}

export interface BillingEligible {
  billingEligible: BillingEligible_billingEligible;
}

export interface BillingEligibleVariables {
  userId: string;
  catalogClass: CatalogItemClass;
}
