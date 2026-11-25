/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DocumentNode
// ====================================================

export interface DocumentNode_marks {
  __typename: "NodeMark";
  /**
   * Options available are bold, italic, underline and code
   */
  type: string;
}

export interface DocumentNode_data {
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

export interface DocumentNode_content_marks {
  __typename: "NodeMark";
  /**
   * Options available are bold, italic, underline and code
   */
  type: string;
}

export interface DocumentNode_content_data {
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

export interface DocumentNode_content_content_marks {
  __typename: "NodeMark";
  /**
   * Options available are bold, italic, underline and code
   */
  type: string;
}

export interface DocumentNode_content_content_data {
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

export interface DocumentNode_content_content {
  __typename: "DocumentNode";
  /**
   * Defines the type of node. Options are document, paragraph, text and link
   */
  nodeType: string;
  /**
   * Value to display. Only Text and Link nodes contains value to display
   */
  value: string | null;
  marks: DocumentNode_content_content_marks[] | null;
  /**
   * Used to pass required extra data to render an specific node type
   */
  data: DocumentNode_content_content_data | null;
}

export interface DocumentNode_content {
  __typename: "DocumentNode";
  /**
   * Defines the type of node. Options are document, paragraph, text and link
   */
  nodeType: string;
  /**
   * Value to display. Only Text and Link nodes contains value to display
   */
  value: string | null;
  marks: DocumentNode_content_marks[] | null;
  /**
   * Used to pass required extra data to render an specific node type
   */
  data: DocumentNode_content_data | null;
  content: DocumentNode_content_content[] | null;
}

export interface DocumentNode {
  __typename: "DocumentNode";
  /**
   * Defines the type of node. Options are document, paragraph, text and link
   */
  nodeType: string;
  /**
   * Value to display. Only Text and Link nodes contains value to display
   */
  value: string | null;
  marks: DocumentNode_marks[] | null;
  /**
   * Used to pass required extra data to render an specific node type
   */
  data: DocumentNode_data | null;
  content: DocumentNode_content[] | null;
}
