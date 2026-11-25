/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ServiceDeskContactSearch
// ====================================================

export interface ServiceDeskContactSearch_serviceDeskContactSearch {
  __typename: "ServiceDeskContact";
  /**
   * Phone number. (E.164 format). Example: "+3612346389"
   */
  number: string;
  /**
   * Hours of operation. Example: "Open 24 hours (Monday - Sunday)"
   */
  hours: string;
  /**
   * Supported languages. Example: "English, French and Spanish"
   */
  languages: string;
}

export interface ServiceDeskContactSearch {
  serviceDeskContactSearch: ServiceDeskContactSearch_serviceDeskContactSearch;
}
