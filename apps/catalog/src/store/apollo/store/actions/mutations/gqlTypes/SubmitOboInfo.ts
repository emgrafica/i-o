/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OboUser, OboUserRights } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: SubmitOboInfo
// ====================================================

export interface SubmitOboInfo_submitOboInfo_user {
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

export interface SubmitOboInfo_submitOboInfo_userRights {
  __typename: "UserRights";
  id: string;
  featureCode: string | null;
  enabled: boolean | null;
}

export interface SubmitOboInfo_submitOboInfo {
  __typename: "OboInfo";
  user: SubmitOboInfo_submitOboInfo_user | null;
  userRights: (SubmitOboInfo_submitOboInfo_userRights | null)[] | null;
}

export interface SubmitOboInfo {
  submitOboInfo: SubmitOboInfo_submitOboInfo | null;
}

export interface SubmitOboInfoVariables {
  user?: OboUser | null;
  userRights?: (OboUserRights | null)[] | null;
}
