/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserAvatar
// ====================================================

export interface UserAvatar_userProfile {
  __typename: "UserProfile";
  /**
   * The link to avatar image of the user
   */
  avatar: string | null;
}

export interface UserAvatar {
  /**
   * UserId argument takes precedence, then email, and last uniqueId header
   */
  userProfile: UserAvatar_userProfile;
}

export interface UserAvatarVariables {
  userId?: string | null;
}
