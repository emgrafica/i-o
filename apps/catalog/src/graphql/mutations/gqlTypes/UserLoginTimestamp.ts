/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserLoginTimestamp
// ====================================================

export interface UserLoginTimestamp_userLoginTimestamp {
  __typename: "UserLoginTimeData";
  /**
   * UTC timestamp of the last time the user logged into the platform
   */
  lastLoginTime: number;
}

export interface UserLoginTimestamp {
  userLoginTimestamp: UserLoginTimestamp_userLoginTimestamp;
}

export interface UserLoginTimestampVariables {
  userId: string;
}
