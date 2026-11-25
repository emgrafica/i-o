/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BusinessApplicationIncidentUrgency } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: createBusinessAppIncident
// ====================================================

export interface createBusinessAppIncident_createBusinessAppIncident {
  __typename: "BusinessApplicationIncident";
  /**
   * Tenant Display ID of Incident
   */
  tenantDisplayId: string;
  /**
   * Number to identify the application record, it constitutes a unique ID
   */
  id: string;
}

export interface createBusinessAppIncident {
  createBusinessAppIncident: createBusinessAppIncident_createBusinessAppIncident;
}

export interface createBusinessAppIncidentVariables {
  createdOn?: string | null;
  shortDescription: string;
  description: string;
  assignmentGroup: string;
  productL1: string;
  productL2: string;
  externalId?: string | null;
  urgency?: BusinessApplicationIncidentUrgency | null;
  filesToBeAttached?: string[] | null;
}
