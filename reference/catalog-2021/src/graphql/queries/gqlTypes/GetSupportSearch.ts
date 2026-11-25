/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { KnowledgeArticleLanguageCode, BusinessApplicationType } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetSupportSearch
// ====================================================

export interface GetSupportSearch_knowledgeArticleSearch_items {
  __typename: "KnowledgeArticle";
  /**
   * Article ID
   */
  id: string;
  /**
   * Article title
   */
  title: string;
  /**
   * Article extracts
   */
  extracts: string[];
  /**
   * Article description
   */
  description: string | null;
  /**
   * Article url
   */
  url: string;
}

export interface GetSupportSearch_knowledgeArticleSearch {
  __typename: "KnowledgeArticleSearch";
  /**
   * Total number of matching articles
   */
  totalItems: number;
  /**
   * Page size
   */
  pageSize: number;
  /**
   * Page number
   */
  pageNumber: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * List of knowledge articles
   */
  items: GetSupportSearch_knowledgeArticleSearch_items[];
}

export interface GetSupportSearch_businessApplicationSearch_items {
  __typename: "BusinessApplication";
  /**
   * Name of the application record
   */
  name: string;
  /**
   * Number to identify the application record, it constitutes a unique id
   */
  number: string;
  /**
   * Short description of the incident
   */
  shortDescription: string | null;
  /**
   * Unique identifier of the application record
   */
  id: string;
  /**
   * Business related to the application record.
   */
  business: string | null;
  /**
   * Id for the service
   */
  serviceId: string | null;
  /**
   * Id for the service offering
   */
  serviceOfferingId: string | null;
  /**
   * Assignment group where the record incident should be routed to
   */
  assignmentGroup: string | null;
  /**
   * Template used for the form to submit an incident
   */
  questionnaire: string | null;
  /**
   * Defines if the records should be a external url or an incident creation
   */
  type: BusinessApplicationType;
  /**
   * Defines the url for external support
   */
  url: string | null;
  /**
   * Define if the user can define their own description
   */
  userDefinedShortDescription: boolean;
}

export interface GetSupportSearch_businessApplicationSearch {
  __typename: "BusinessApplicationSearch";
  /**
   * Page size
   */
  pageSize: number;
  /**
   * Page number
   */
  pageNumber: number;
  /**
   * Total amount of business applications
   */
  totalItems: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * List of business applications that match the search
   */
  items: GetSupportSearch_businessApplicationSearch_items[];
  /**
   * List of businesses  that match the search
   */
  businessFilters: string[] | null;
}

export interface GetSupportSearch {
  knowledgeArticleSearch: GetSupportSearch_knowledgeArticleSearch;
  businessApplicationSearch: GetSupportSearch_businessApplicationSearch;
}

export interface GetSupportSearchVariables {
  keywords: string;
  pageSize?: number | null;
  knowledgeArticlePageNumber?: number | null;
  knowledgeArticleLanguage?: KnowledgeArticleLanguageCode | null;
  businessApplicationPageNumber?: number | null;
  businessApplicationBusinessFilter?: string | null;
}
