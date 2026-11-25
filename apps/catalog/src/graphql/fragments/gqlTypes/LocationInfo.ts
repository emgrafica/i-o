/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LocationInfo
// ====================================================

export interface LocationInfo {
  __typename: "LocationInfo";
  /**
   * Line 1 of the user address
   */
  address1: string | null;
  /**
   * Line 2 of the user address
   */
  address2: string | null;
  /**
   * The city of the user
   */
  city: string | null;
  /**
   * The state of the user
   */
  state: string | null;
  /**
   * This zip code of the user
   */
  zip: string | null;
  /**
   * The country of the user
   */
  country: string;
}
