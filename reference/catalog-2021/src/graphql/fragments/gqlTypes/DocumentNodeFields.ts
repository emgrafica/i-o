/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DocumentNodeFields
// ====================================================

export interface DocumentNodeFields_marks {
  __typename: "NodeMark";
  /**
   * Options available are bold, italic, underline and code
   */
  type: string;
}

export interface DocumentNodeFields_data {
  __typename: "LinkNode";
  /**
   * url to navigate to
   */
  target: string;
  /**
   * open link on new window or not
   */
  openOnNewWindow: boolean;
}

export interface DocumentNodeFields {
  __typename: "DocumentNode";
  /**
   * Defines the type of node. Options are document, paragraph, text and link
   */
  nodeType: string;
  /**
   * Value to display. Only Text and Link nodes contains value to display
   */
  value: string | null;
  marks: DocumentNodeFields_marks[] | null;
  /**
   * Used to pass required extra data to render an specific node type
   */
  data: DocumentNodeFields_data | null;
}
