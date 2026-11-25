/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OboInfo
// ====================================================

export interface OboInfo_oboInfo_user {
  __typename: "User";
  /**
   * User ID
   */
  userId: string;
  /**
   * User first name
   */
  firstName: string | null;
  /**
   * User last name
   */
  lastName: string | null;
}

export interface OboInfo_oboInfo_userRights {
  __typename: "UserRights";
  id: string;
  featureCode: string | null;
  enabled: boolean | null;
}

export interface OboInfo_oboInfo {
  __typename: "OboInfo";
  user: OboInfo_oboInfo_user | null;
  userRights: (OboInfo_oboInfo_userRights | null)[] | null;
}

export interface OboInfo {
  oboInfo: OboInfo_oboInfo | null;
}
