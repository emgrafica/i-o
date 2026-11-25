/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TechnologyCheckoutPage
// ====================================================

export interface TechnologyCheckoutPage_technologyCheckoutPage_content {
  __typename: 'ConfigurationContent';
  /**
   * The title of this section
   */
  title: string;
  /**
   * The body of this section
   */
  body: string;
}

export interface TechnologyCheckoutPage_technologyCheckoutPage {
  __typename: 'TechnologyCheckoutPage';
  /**
   * The configurable section
   */
  content: TechnologyCheckoutPage_technologyCheckoutPage_content;
  /**
   * The agreement message for external workflow
   */
  agreement: string | null;
}

export interface TechnologyCheckoutPage {
  technologyCheckoutPage: TechnologyCheckoutPage_technologyCheckoutPage;
}
