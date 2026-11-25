/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HelpDeskType } from './../globalTypes';

// ====================================================
// GraphQL query operation: ChatConfiguration
// ====================================================

export interface ChatConfiguration_chatConfiguration {
  __typename: 'ChatConfiguration';
  /**
   * Enum of Helpdesk states
   */
  helpdesk: HelpDeskType;
  /**
   * Title of message
   */
  title: string | null;
  /**
   * main text content of message
   */
  description: string[] | null;
  /**
   * url to external help desk
   */
  url: string | null;
  /**
   * Name of url
   */
  urlName: string | null;
}

export interface ChatConfiguration {
  chatConfiguration: ChatConfiguration_chatConfiguration;
}

export interface ChatConfigurationVariables {
  userId: string;
}
