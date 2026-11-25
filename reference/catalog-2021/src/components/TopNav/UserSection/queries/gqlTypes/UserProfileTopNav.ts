/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfileTopNav
// ====================================================

export interface UserProfileTopNav_userProfile {
  __typename: "UserProfile";
  /**
   * The first name of the user
   */
  firstName: string;
  /**
   * The last name of the user
   */
  lastName: string;
  /**
   * The link to avatar image of the user
   */
  avatar: string | null;
  /**
   * The preferred display name of the user
   */
  preferredName: string | null;
}

export interface UserProfileTopNav {
  /**
   * UserId argument takes precedence, then email, and last uniqueId header
   */
  userProfile: UserProfileTopNav_userProfile;
}

export interface UserProfileTopNavVariables {
  userId?: string | null;
}
