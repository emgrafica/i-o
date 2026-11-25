/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserPreferredLanguage
// ====================================================

export interface UserPreferredLanguage_userPreferences_preferences {
  __typename: 'UserPreferences';
  /**
   * Preferred language
   */
  language: string | null;
}

export interface UserPreferredLanguage_userPreferences {
  __typename: 'UserProfilePreferences';
  /**
   * UserPreferences
   */
  preferences: UserPreferredLanguage_userPreferences_preferences;
}

export interface UserPreferredLanguage {
  userPreferences: UserPreferredLanguage_userPreferences;
}

export interface UserPreferredLanguageVariables {
  userId: string;
}
