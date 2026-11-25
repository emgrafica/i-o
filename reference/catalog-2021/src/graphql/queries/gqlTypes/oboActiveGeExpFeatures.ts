/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: oboActiveGeExpFeatures
// ====================================================

export interface oboActiveGeExpFeatures_oboActiveGeExpFeatures {
  __typename: "OboActiveGeExpFeatureControl";
  /**
   * Unique ID of the feature entry
   */
  id: string;
  /**
   * The area of the GE EXP experience where this rule is effective
   */
  featureCode: string;
  /**
   * Whether or not this feature is enabled when OBO is active, defaulted to false
   */
  enabled: boolean | null;
}

export interface oboActiveGeExpFeatures {
  /**
   * Retrieves all OBO Active GE EXP Feature Controls
   */
  oboActiveGeExpFeatures: oboActiveGeExpFeatures_oboActiveGeExpFeatures[];
}
