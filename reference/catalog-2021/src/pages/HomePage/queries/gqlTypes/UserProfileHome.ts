/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfileHome
// ====================================================

export interface UserProfileHome_userProfile_locationInfo {
  __typename: "LocationInfo";
  /**
   * The country of the user
   */
  country: string;
}

export interface UserProfileHome_userProfile_businessInfo {
  __typename: "BusinessInfo";
  /**
   * The name of the business
   */
  name: string | null;
}

export interface UserProfileHome_userProfile {
  __typename: "UserProfile";
  /**
   * The ID of the user
   */
  userId: string;
  /**
   * The first name of the user
   */
  firstName: string;
  /**
   * The last name of the user
   */
  lastName: string;
  /**
   * The preferred display name of the user
   */
  preferredName: string | null;
  /**
   * The link to avatar image of the user
   */
  avatar: string | null;
  /**
   * The location information of the user
   */
  locationInfo: UserProfileHome_userProfile_locationInfo;
  /**
   * The business information of the user
   */
  businessInfo: UserProfileHome_userProfile_businessInfo[];
}

export interface UserProfileHome {
  /**
   * UserId argument takes precedence, then email, and last uniqueId header
   */
  userProfile: UserProfileHome_userProfile;
}

export interface UserProfileHomeVariables {
  userId?: string | null;
}
