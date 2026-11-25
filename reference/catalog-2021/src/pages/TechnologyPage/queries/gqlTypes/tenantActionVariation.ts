/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReportBrokenActionVariation, ReportOwnerShipErrorActionVariation, EditUsageActionVariation, ReportMissingVariation, RegisterOwnershipVariation } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: tenantActionVariation
// ====================================================

export interface tenantActionVariation_tenantActionVariation {
  __typename: "Variations";
  reportBrokenActionVariation: ReportBrokenActionVariation;
  reportOwnershipErrorActionVariation: ReportOwnerShipErrorActionVariation;
  editUsageActionVariation: EditUsageActionVariation;
  reportMissingActionVariation: ReportMissingVariation;
  registerOwnershipActionVariation: RegisterOwnershipVariation;
}

export interface tenantActionVariation {
  /**
   * The tenant configured action variations
   */
  tenantActionVariation: tenantActionVariation_tenantActionVariation;
}
