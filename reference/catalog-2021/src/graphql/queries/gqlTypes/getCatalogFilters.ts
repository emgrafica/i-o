/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogItemClass } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: getCatalogFilters
// ====================================================

export interface getCatalogFilters_catalogFilters_children_children {
  __typename: "CatalogFilters";
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
}

export interface getCatalogFilters_catalogFilters_children {
  __typename: "CatalogFilters";
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
  /**
   * Child filters that this filter has
   */
  children: getCatalogFilters_catalogFilters_children_children[] | null;
}

export interface getCatalogFilters_catalogFilters {
  __typename: "CatalogFilters";
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
  /**
   * Child filters that this filter has
   */
  children: getCatalogFilters_catalogFilters_children[] | null;
}

export interface getCatalogFilters {
  /**
   * Retrieves the catalog filters based on the available data in the catalog for the specific catalog class
   */
  catalogFilters: getCatalogFilters_catalogFilters[];
}

export interface getCatalogFiltersVariables {
  class: CatalogItemClass;
  userId: string;
}
