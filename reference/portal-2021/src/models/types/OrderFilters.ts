/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderFilters
// ====================================================

export interface OrderFilters_catalogRequestFilters_children_children {
  __typename: 'CatalogRequestFilters';
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

export interface OrderFilters_catalogRequestFilters_children {
  __typename: 'CatalogRequestFilters';
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Child filters that this filter has
   */
  children: OrderFilters_catalogRequestFilters_children_children[] | null;
}

export interface OrderFilters_catalogRequestFilters {
  __typename: 'CatalogRequestFilters';
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Child filters that this filter has
   */
  children: OrderFilters_catalogRequestFilters_children[] | null;
}

export interface OrderFilters {
  /**
   * Retrieves the requests filters
   */
  catalogRequestFilters: OrderFilters_catalogRequestFilters[];
}
