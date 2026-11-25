/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRange } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: IncidentDateFilters
// ====================================================

export interface IncidentDateFilters_incidentDateFilters {
  __typename: "IncidentDateFilterOptions";
  rangeValue: string;
  rangeOption: DateRange;
}

export interface IncidentDateFilters {
  incidentDateFilters: IncidentDateFilters_incidentDateFilters[];
}
