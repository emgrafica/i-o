/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocationType } from './../globalTypes';

// ====================================================
// GraphQL query operation: Locations
// ====================================================

export interface Locations {
  /**
   * This query returns the following: a list of states when the return type arg is
   * set to "State" and provided a country, a list of cities when the return arg is
   * set to "City" and provided a country and state, a list of sites when the input
   * arg is set to "Site" and provided a country, state, and city
   */
  locations: string[];
}

export interface LocationsVariables {
  locationReturnType: LocationType;
  country: string;
  state?: string | null;
  city?: string | null;
}
