/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: QuickLinks
// ====================================================

export interface QuickLinks {
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
