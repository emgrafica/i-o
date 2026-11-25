/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfileRequest
// ====================================================

export interface UserProfileRequest_userProfile_locationInfo {
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

export interface UserProfileRequest_userProfile_businessInfo {
  __typename: "BusinessInfo";
  /**
   * The name of the business
   */
  name: string | null;
  /**
   * The business tier for structuring hierarchy of business
   */
  tier: number | null;
}

export interface UserProfileRequest_userProfile {
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
   * The preferred display name of the user
   */
  preferredName: string | null;
  /**
   * The last name of the user
   */
  lastName: string;
  /**
   * The phone number of the user
   */
  phone: string | null;
  /**
   * The email of the user
   */
  email: string;
  /**
   * The link to avatar image of the user
   */
  avatar: string | null;
  /**
   * The location information of the user
   */
  locationInfo: UserProfileRequest_userProfile_locationInfo;
  /**
   * The business information of the user
   */
  businessInfo: UserProfileRequest_userProfile_businessInfo[];
}

export interface UserProfileRequest {
  /**
   * UserId argument takes precedence, then email, and last uniqueId header
   */
  userProfile: UserProfileRequest_userProfile;
}

export interface UserProfileRequestVariables {
  userId?: string | null;
}
