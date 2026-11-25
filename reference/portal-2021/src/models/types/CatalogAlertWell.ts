/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogItemClass } from './../globalTypes';

// ====================================================
// GraphQL query operation: CatalogAlertWell
// ====================================================

export interface CatalogAlertWell_catalogAlertWell_message_marks {
  __typename: 'NodeMark';
  /**
   * Options available are bold, italic, underline and code
   */
  type: string;
}

export interface CatalogAlertWell_catalogAlertWell_message_data {
  __typename: 'LinkNode';
  /**
   * url to navigate to
   */
  target: string;
  /**
   * open link on new window or not
   */
  openOnNewWindow: boolean;
}

export interface CatalogAlertWell_catalogAlertWell_message_content_marks {
  __typename: 'NodeMark';
  /**
   * Options available are bold, italic, underline and code
   */
  type: string;
}

export interface CatalogAlertWell_catalogAlertWell_message_content_data {
  __typename: 'LinkNode';
  /**
   * url to navigate to
   */
  target: string;
  /**
   * open link on new window or not
   */
  openOnNewWindow: boolean;
}

export interface CatalogAlertWell_catalogAlertWell_message_content_content_marks {
  __typename: 'NodeMark';
  /**
   * Options available are bold, italic, underline and code
   */
  type: string;
}

export interface CatalogAlertWell_catalogAlertWell_message_content_content_data {
  __typename: 'LinkNode';
  /**
   * url to navigate to
   */
  target: string;
  /**
   * open link on new window or not
   */
  openOnNewWindow: boolean;
}

export interface CatalogAlertWell_catalogAlertWell_message_content_content {
  __typename: 'DocumentNode';
  /**
   * Defines the type of node. Options are document, paragraph, text and link
   */
  nodeType: string;
  /**
   * Value to display. Only Text and Link nodes contains value to display
   */
  value: string | null;
  marks:
    | CatalogAlertWell_catalogAlertWell_message_content_content_marks[]
    | null;
  /**
   * Used to pass required extra data to render an specific node type
   */
  data: CatalogAlertWell_catalogAlertWell_message_content_content_data | null;
}

export interface CatalogAlertWell_catalogAlertWell_message_content {
  __typename: 'DocumentNode';
  /**
   * Defines the type of node. Options are document, paragraph, text and link
   */
  nodeType: string;
  /**
   * Value to display. Only Text and Link nodes contains value to display
   */
  value: string | null;
  marks: CatalogAlertWell_catalogAlertWell_message_content_marks[] | null;
  /**
   * Used to pass required extra data to render an specific node type
   */
  data: CatalogAlertWell_catalogAlertWell_message_content_data | null;
  content: CatalogAlertWell_catalogAlertWell_message_content_content[] | null;
}

export interface CatalogAlertWell_catalogAlertWell_message {
  __typename: 'DocumentNode';
  /**
   * Defines the type of node. Options are document, paragraph, text and link
   */
  nodeType: string;
  /**
   * Value to display. Only Text and Link nodes contains value to display
   */
  value: string | null;
  marks: CatalogAlertWell_catalogAlertWell_message_marks[] | null;
  /**
   * Used to pass required extra data to render an specific node type
   */
  data: CatalogAlertWell_catalogAlertWell_message_data | null;
  content: CatalogAlertWell_catalogAlertWell_message_content[] | null;
}

export interface CatalogAlertWell_catalogAlertWell {
  __typename: 'CatalogAlertWell';
  /**
   * Whether or not the Alert Well is active for this class
   */
  enabled: boolean;
  /**
   * The catalog class this alert well is for
   */
  catalogClass: string;
  /**
   * The message to display in the alert well
   */
  message: CatalogAlertWell_catalogAlertWell_message | null;
}

export interface CatalogAlertWell {
  /**
   * Retrieves the Catalog Tenant Config of a specific Tenant
   */
  catalogAlertWell: CatalogAlertWell_catalogAlertWell;
}

export interface CatalogAlertWellVariables {
  userId: string;
  catalogClass: CatalogItemClass;
}
