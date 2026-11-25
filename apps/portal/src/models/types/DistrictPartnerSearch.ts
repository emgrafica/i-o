/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DistrictPartnerSearch
// ====================================================

export interface DistrictPartnerSearch_districtPartnerSearch {
  __typename: 'DistrictPartner';
  /**
   * Name of representative
   */
  name: string | null;
  /**
   * DP Representative username
   */
  username: string | null;
  /**
   * Email address of user
   */
  email: string | null;
  /**
   * Phone number of contact
   */
  phone: string | null;
}

export interface DistrictPartnerSearch {
  districtPartnerSearch: DistrictPartnerSearch_districtPartnerSearch;
}
