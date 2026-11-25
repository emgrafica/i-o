/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GcomSites
// ====================================================

export interface GcomSites_gcomSites {
  __typename: "GcomSites";
  /**
   * The site address
   */
  site: string;
  /**
   * The site ID
   */
  siteCode: string;
}

export interface GcomSites {
  /**
   * This query returns the following: a list of states when the return type arg is
   * set to "State" and provided a country, a list of cities when the return arg is
   * set to "City" and provided a country and state, a list of GCOM enabled sites
   * when the input arg is set to "Site" and provided a country, state, and city
   */
  gcomSites: GcomSites_gcomSites[];
}

export interface GcomSitesVariables {
  country: string;
  state: string;
  city: string;
}
